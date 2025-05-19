import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "../components/UI/Select/Select";
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import CodeEditor from "../components/UI/CodeEditor/CodeEditor";
import { useActiveProjectStore, useUserStore } from '../store/store.js';
import Button from "../components/UI/Button/Button.jsx";
import ProjectSolution from "../components/ProjectSolutions.jsx";
import useUserProject from '../hooks/useUserProject.js';
import { userAPI } from '../api/api';
import Loader from "../components/UI/Loader/Loader.jsx";
import { SUPPORTED_LANGUAGES } from "../data/SUPPORTED_LANGUAGES.js";
import { useNotification } from "../components/Shared/NotificationProvider/NotificationProvider";
import { handleServerErrors } from "../utils/handleServerErrors/handleServerErrors";

function Project() {
  const { id } = useParams(); // Может быть undefined, если URL /project без id
  const navigate = useNavigate();
  const { id: userId } = useUserStore();
  const { setActiveProject } = useActiveProjectStore();
  const { isLoading: isLoadingProject, error, userProject } = useUserProject(id);
  const [selectedLang, setSelectedLang] = useState({ value: "", label: "" });
  const [isMyCodeBlock, setIsMyCodeBlock] = useState(true);
  const [code, setCode] = useState("");
  const [localProject, setLocalProject] = useState(null);
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const { notify } = useNotification();
  const tabsRef = useRef(null);

  // Проверка последнего проекта из localStorage, если id не указан
  useEffect(() => {
    if (!id) {
      let lastProjectId = null;
      const item = localStorage.getItem("recent_project_id");
      if (item && item !== "undefined") {
        lastProjectId = JSON.parse(item);
      }
      if (lastProjectId) {
        navigate(`/project/${lastProjectId}`);
      } else {
        navigate("/projects"); // Запасной маршрут, если нет последнего проекта
      }
    }
  }, [id, navigate]);

  // Загрузка данных проекта
  useEffect(() => {
    if (!isLoadingProject && id) {
      setIsLoading(true);
      if (userProject) {
        setActiveProject(userProject);
        setLocalProject(userProject);
        setCode(userProject.code || "");
        setSelectedLang({
          value: userProject?.language || "",
          label: SUPPORTED_LANGUAGES.find(lang => lang.value === userProject?.language)?.label || ""
        });
        setAvailableLanguages(
          userProject?.available_languages?.map(lang => ({
            value: lang.compiler_name,
            label: lang.name
          })) || []
        );
        setIsLoading(false);
      } else if (error) {
        navigate("/not-found");
      }
    }
  }, [isLoadingProject, userProject, error, navigate, setActiveProject, id]);

  // Сохранение проекта
  const handleSave = async () => {
    try {
      const updatedProject = {
        ...localProject,
        language: selectedLang.value,
        code,
      };
      await userAPI.updateUserProjectById(id, updatedProject);
      notify("Проект успешно сохранён!", "success");
      setActiveProject(updatedProject);
      setLocalProject(updatedProject);
      tabsRef.current.setTab('output');
    } catch (err) {
      console.error("Ошибка при сохранении проекта:", err.response?.data || err.message);
      handleServerErrors(err.response?.data, notify, {
        defaultMessage: "Ошибка при сохранении проекта. Попробуйте снова.",
        fieldNames: {
          code: "Код",
          language: "Язык",
          detail: "Ошибка",
        },
      });
    }
  };

  // Публикация проекта
  const handlePublish = async () => {
    try {
      const updatedProject = {
        ...localProject,
        language: SUPPORTED_LANGUAGES.find(obj => obj.label === selectedLang.label)?.value,
        is_published: true,
      };
      await userAPI.updateUserProjectById(id, updatedProject);
      notify("Проект успешно опубликован!", "success");
      setActiveProject(updatedProject);
      setLocalProject(updatedProject);
    } catch (err) {
      console.error("Ошибка при публикации проекта:", err.response?.data || err.message);
      handleServerErrors(err.response?.data, notify, {
        defaultMessage: "Ошибка при публикации проекта. Попробуйте снова.",
        fieldNames: {
          code: "Код",
          language: "Язык",
          detail: "Ошибка",
        },
      });
    }
  };

  // Запуск кода
  const handleRunCode = async () => {
    try {
      tabsRef.current.setTab('output');
      const result = await userAPI.executeCode(
        userId,
        code,
        selectedLang.value,
        inputData || null,
        id
      );
      setOutputData(result.output || result.error || "Нет вывода");
    } catch (err) {
      console.error("Ошибка выполнения кода:", err);
      setOutputData("Ошибка: " + (err.response?.data?.error || err.message));
    }
  };

  // Проверка решения
  const handleCheckSolution = async () => {
    try {
      tabsRef.current.setTab('output');
      const requestData = {
        user_project: userId,
        code,
        language: selectedLang.value,
        project: id,
      };
      const result = await userAPI.checkSolution(userId, code, selectedLang.value, id);
      console.log(result)
      const isCorrect = result.status;
      setOutputData(
        isCorrect
          ? "Решение правильное!"
          : `Решение неверное: ${result.error || "Неизвестная ошибка"}`
      );
      notify(
        isCorrect
          ? "Решение правильное!"
          : `Решение неверное: ${result.error || "Неизвестная ошибка"}`,
        isCorrect ? "success" : "error"
      );
      if (isCorrect) {
        // Обновляем проект как завершённый
        const updatedProject = {
          ...localProject,
          is_completed: true,
          language: selectedLang.value,
          code,
        };
        await userAPI.updateUserProjectById(id, updatedProject);
        setActiveProject(updatedProject);
        setLocalProject(updatedProject);
      }
    } catch (err) {
      console.error("Ошибка при проверке решения:", err.response?.data || err.message);
      setOutputData("Ошибка проверки: " + (err.response?.data?.error || err.message));
      handleServerErrors(err.response?.data, notify, {
        defaultMessage: "Ошибка при проверке решения. Попробуйте снова.",
        fieldNames: {
          code: "Код",
          language: "Язык",
          detail: "Ошибка",
        },
      });
    }
  };

  // Завершение проекта
  const handleEndProject = async () => {
    try {
      tabsRef.current.setTab('output');
      const projectData = {
        project: id,
        code,
        language: selectedLang.value,
      };
      const result = await userAPI.endUserProject(id, projectData);
      if (result.is_completed) {
        setOutputData("Решение правильное! Проект завершён.");
        notify("Проект успешно завершён!", "success");
        // Обновляем проект как завершённый
        const updatedProject = {
          ...localProject,
          is_completed: true,
          language: selectedLang.value,
          code,
        };
        await userAPI.updateUserProjectById(id, updatedProject);
        setActiveProject(updatedProject);
        setLocalProject(updatedProject);
      } else {
        setOutputData(`Решение неверное: ${result["Project completion status"] || "Неизвестная ошибка"}`);
        notify(
          `Решение неверное: ${result["Project completion status"] || "Неизвестная ошибка"}`,
          "error"
        );
      }
    } catch (err) {
      console.error("Ошибка при завершении проекта:", err.response?.data || err.message);
      setOutputData(
        `Ошибка завершения: ${err.response?.data?.["Project completion status"] || err.message}`
      );
      handleServerErrors(err.response?.data, notify, {
        defaultMessage: "Ошибка при завершении проекта. Попробуйте снова.",
        fieldNames: {
          code: "Код",
          language: "Язык",
          detail: "Ошибка",
        },
      });
    }
  };

  const tabs = [
    { id: "theory", label: "Теория" },
    { id: "description", label: "Описание задания" },
    { id: "output", label: "Результат" },
  ];
  if (isLoading || isLoadingProject || (!id && !localProject)) {
    return <Loader />;
  }

  return (
    <div className="container container-big">
      <div className="row">
        <div className="col-lg-4">
          <div className="task__block--height">
            <div className="task__block task__block--title">
              <h3>{localProject.project_name}</h3>
            </div>
            <div className="task__block task__block--fullHeight">
              <Tabs ref={tabsRef} tabs={tabs} defaultActiveTab="theory">
                <TabHeader tabs={tabs} />
                <Tab id="theory">
                  <div className="task__block__section">
                    <h5>Теория:</h5>
                    <div dangerouslySetInnerHTML={{ __html: localProject.project_theory || "Теория отсутствует" }} />
                  </div>
                </Tab>
                <Tab id="description">
                  <div className="task__block__section">
                    <h5>Описание задания:</h5>
                    <div dangerouslySetInnerHTML={{ __html: localProject.project_description || "Описание отсутствует" }} />
                  </div>
                </Tab>
                <Tab id="output">
                  <div className="task__block__section">
                    <h5>Результат:</h5>
                    <div className="output mt-3 p-2 bg-dark text-light rounded">
                      <pre>{outputData || "Здесь будет результат выполнения кода"}</pre>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="task__block task__block--height">
            <div className="task__block__tools">
              <div className="task__block__tools__button">
                {isMyCodeBlock ? (
                  localProject.is_completed ? (
                    !localProject.is_published && (
                      <Button variant="small" className="me-3" onClick={handlePublish}>
                        Опубликовать
                      </Button>
                    )
                  ) : (
                    <>
                      <Button variant="small" className="me-3" onClick={handleRunCode}>
                        Запустить код
                      </Button>
                      <Button variant="small" className="me-3" onClick={handleSave} title="Сохранить код (Ctrl + S)">
                        Сохранить
                      </Button>
                      <Button variant="small" className="me-3" onClick={handleCheckSolution}>
                        Подтвердить
                      </Button>
                      <Button variant="small" className="me-3" onClick={handleEndProject}>
                        Завершить проект
                      </Button>
                    </>
                  )
                ) : (
                  <Button variant="small" className="me-3" onClick={() => setIsMyCodeBlock(true)}>
                    Мое решение
                  </Button>
                )}
                {isMyCodeBlock && localProject.is_published && (
                  <Button
                    variant="small"
                    className="me-3"
                    onClick={() => setIsMyCodeBlock(false)}
                  >
                    Другие решения
                  </Button>
                )}
              </div>
              {isMyCodeBlock && (
              <div className="select">
                <Select
                  options={availableLanguages}
                  defaultLabel={selectedLang.label}
                  defaultValue={selectedLang.value}
                  placeholder="Выберите язык"
                  onChange={({ value, label }) => setSelectedLang({ value, label })}
                />
              </div>
              )}

            </div>
            {isMyCodeBlock ? (
              <div className="task__block__editor">
                <CodeEditor
                  language={selectedLang.value}
                  initialCode={localProject.code || ""}
                  onChange={(newCode) => setCode(newCode)}
                  onSave={handleSave}
                  isReadOnly={localProject.is_completed}
                />
                <div className="output mt-3 p-2 bg-dark text-light rounded">
                  <h5>Входные данные:</h5>
                  <textarea
                    className="input-data-control"
                    style={{ minHeight: "100px", backgroundColor: "#1e1e1e", color: "#fff" }}
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              localProject.is_published && (
                <div className="task__block__solution">
                  <ProjectSolution sortedLang={selectedLang} projectId={id} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;