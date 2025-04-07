import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "../components/UI/Select/Select";
import Tabs, { Tab, TabHeader } from '../components/UI/Tabs/Tabs';
import CodeEditor from "../components/UI/CodeEditor/CodeEditor";
import { useActiveProjectStore } from '../store/store.js';
import Button from "../components/UI/Button/Button.jsx";
import ProjectSolution from "../components/ProjectSolutions.jsx";
import useUserProject from '../hooks/useUserProject.js';
import { userAPI } from '../api/api';
import Loader from "../components/UI/Loader/Loader.jsx";
import { SUPPORTED_LANGUAGES } from "../data/SUPPORTED_LANGUAGES.js";

function Project() {
  const { id } = useParams(); // Может быть undefined, если URL /project без id
  const navigate = useNavigate();
  const { setActiveProject } = useActiveProjectStore();
  const { isLoading:isLoadingProject, error, userProject } = useUserProject(id);
  const [selectedLang, setSelectedLang] = useState("");
  const [isMyCodeBlock, setIsMyCodeBlock] = useState(true);
  const [code, setCode] = useState("");
  const [localProject, setLocalProject] = useState(null);
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [isLoading, setIsLoading] = useState(true);
  // Проверка последнего проекта из localStorage, если id не указан
  useEffect(() => {
    if (!id) {
      const lastProjectId = JSON.parse(localStorage.getItem("recent_project_id")) || null;
      if (lastProjectId) {
        navigate(`/project/${lastProjectId}`);
      } else {
        navigate("/projects"); // Запасной маршрут, если нет последнего проекта
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!isLoadingProject && id) {
      console.log(isLoading);
      setIsLoading(true)
      if (userProject) {

        console.log("userProject:", userProject);
        setActiveProject(userProject);
        setLocalProject(userProject);
        setCode(userProject.code || "");
        setSelectedLang(userProject?.language || "C++");
        console.log(isLoading);
        setIsLoading(false);
      } else if (error) {
        console.log("Error:", error);
        navigate("/not-found");
      }
    }
  }, [isLoadingProject, userProject, error, navigate, setActiveProject, id]);

  const handleSave = async () => {
    try {
      const updatedProject = {
        language: selectedLang,
        code,
      };
      await userAPI.updateUserProjectById(id, updatedProject);
      console.log("Проект успешно сохранён!");
      setActiveProject(updatedProject);
      setLocalProject(updatedProject);
    } catch (err) {
      console.error("Ошибка при сохранении проекта:", err.response?.data || err.message);
    }
  };

  const handlePublish = async () => {
    try {
      const updatedProject = {
        ...localProject,
        is_published: true,
      };
      await userAPI.updateUserProjectById(id, updatedProject);
      console.log("Проект успешно опубликован!");
      setActiveProject(updatedProject);
      setLocalProject(updatedProject);
    } catch (err) {
      console.error("Ошибка при публикации проекта:", err.response?.data || err.message);
    }
  };

  const handleRunCode = async () => {
    try {
      setActiveTab("output");
      console.log({
        "code": code,
        "language": selectedLang,
        "input_data": inputData || null,
        "project": id,
      });
      const result = await userAPI.executeCode(
        code,
        selectedLang,
        inputData || null,
        id
      );
      console.log("Результат выполнения:", result);
      setOutputData(result.output || result.error || "Нет вывода");
    } catch (err) {
      console.error("Ошибка выполнения кода:", err);
      setOutputData("Ошибка: " + (err.response?.data?.error || err.message));
    }
  };

  const tabs = [
    { id: "theory", label: "Теория" },
    { id: "description", label: "Описание задания" },
    { id: "output", label: "Результат" },
  ];

  const solutions = [
    {
      id: 1,
      author: 'User1',
      code: `function calculatePrimeFactors(number) {
        let factors = [];
        let divisor = 2;
        while (number >= divisor * divisor) {
          if (number % divisor === 0) {
            factors.push(divisor);
            number = number / divisor;
          } else {
            divisor++;
          }
        }
        if (number > 1) {
          factors.push(number);
        }
        return factors;
      }`,
      stars: 10,
      liked: false,
      showComments: false,
      comments: [
        { author: 'Veselchak', text: 'Отличное решение!', date: '2025-02-22' },
        { author: 'Dokopatel', text: 'Можно еще оптимизировать.', date: '2025-02-21' },
      ],
    },
  ];

  if (isLoading || isLoadingProject || (!id && !localProject)) {
    return <Loader />;
  }

  const projectToDisplay = localProject || {};

  return (
    <div className="container container-big">
      <div className="row">
        <div className="col-lg-4">
          <div className="task__block task__block--height">
            <Tabs tabs={tabs} defaultActiveTab="theory" activeTab={activeTab}>
              <TabHeader tabs={tabs} />
              <Tab id="theory">
                <div className="task__block__section">
                  <h5>Теория:</h5>
                  <div dangerouslySetInnerHTML={{ __html: projectToDisplay.project_theory || "Теория отсутствует" }} />
                </div>
              </Tab>
              <Tab id="description">
                <div className="task__block__section">
                  <h5>Описание задания:</h5>
                  <div dangerouslySetInnerHTML={{ __html: projectToDisplay.project_description || "Описание отсутствует" }} />
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
        <div className="col-lg-8">
          <div className="task__block task__block--height">
            <div className="task__block__tools">
              <div className="task__block__tools__button">
                {isMyCodeBlock ? (
                  projectToDisplay.is_completed ? (
                    !projectToDisplay.is_published && (
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
                      <Button variant="small" className="me-3">Подтвердить</Button>
                    </>
                  )
                ) : (
                  <Button variant="small" className="me-3" onClick={() => setIsMyCodeBlock(true)}>
                    Мое решение
                  </Button>
                )}
                <Button
                  variant="small"
                  className="me-3"
                  onClick={() => setIsMyCodeBlock(false)}
                  disabled={!projectToDisplay.is_published}
                >
                  Другие решения
                </Button>
              </div>
              <div className="select">
                <Select
                  options={SUPPORTED_LANGUAGES}
                  defaultLabel={selectedLang}
                  defaultValue={SUPPORTED_LANGUAGES.find(lang => lang.label === selectedLang)?.value}
                  placeholder="Выберите язык"
                  onChange={({label}) => setSelectedLang(label)}
                />
              </div>
            </div>
            {isMyCodeBlock ? (
              <div className="task__block__editor">
                <CodeEditor
                  language={SUPPORTED_LANGUAGES.find(lang => lang.label === selectedLang)?.value}
                  initialCode={projectToDisplay.code || ""}
                  onChange={(newCode) => setCode(newCode)}
                  onSave={handleSave}
                  isReadOnly={projectToDisplay.is_completed}
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
              projectToDisplay.is_published && (
                <div className="task__block__solution">
                  <ProjectSolution sortedLang={selectedLang} solutions={solutions} />
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