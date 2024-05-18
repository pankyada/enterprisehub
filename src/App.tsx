import './App.css'
import './index.css'
import { useState, useEffect } from 'react';
import { Navigation } from './components/navigation'
// import { Switch } from "@/components/ui/switch"
import { Checkbox } from './components/ui/checkbox';
import GraphBrowser from './components/GraphBrowser';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
// import ChatBot from './components/ChatBot';



function App() {
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);
  const [selectedComponents, setSelectedComponents] = useState<any[]>([]);

  const components: { title: string; href: string; section: string; description: string }[] = [
    {
      title: "My Tasks",
      href: "/docs/primitives/alert-dialog",
      section: "NFR",
      description:
        "List of Issues/Incidents/Actions assigned to you prioritised by RiskAI.",
    },
    {
      title: "This week's Must Do",
      href: "/docs/primitives/hover-card",
      section: "NFR",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Daily Insights",
      href: "/docs/primitives/progress",
      section: "NFR",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Weekly Insights",
      href: "/docs/primitives/scroll-area",
      section: "NFR",
      description: "Visually or semantically separates content.",
    },
    {
      title: "This Month's Must Do",
      href: "/docs/primitives/tabs",
      section: "Compliance",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      section: "Compliance",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]

  useEffect(() => {
    const storedComponents = localStorage.getItem('selectedComponents');
    if (!storedComponents) {
      setIsFirstTime(true);
    } else {
      setSelectedComponents(JSON.parse(storedComponents));
    }
  }, []);


  const [app, setApp] = useState<string>("");

  const handleSave = () => {
    localStorage.setItem('selectedComponents', JSON.stringify(selectedComponents));
    setIsFirstTime(false);
  };

  const handleComponentChange = (component: any) => {
    const newSelection = (selectedComponents.filter(c => c.title === component.title).length > 0)
      ? selectedComponents.filter(c => c.title !== component.title)
      : [...selectedComponents, component];
    setSelectedComponents(newSelection);
  };



  const firstTimeDialog = (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg ">
        <h3 className="text-lg font-semibold">Select the components you are interested in:</h3>
        <div className="bg-white p-4 rounded-lg text-justify">
          {components.map((component, index) => (
            <div key={index} className="my-2 ml-4">
              <label className="inline-flex items-start">
                {/* <input type="checkbox" */}
                <Checkbox
                  checked={selectedComponents.some(comp => comp['title'] === component.title)}
                  onCheckedChange={() => handleComponentChange(component)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">{component.title}</span>
              </label>
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 " onClick={handleSave}>Save</button>
      </div>
    </div>
  );

  return (
    <>
      {isFirstTime && firstTimeDialog}
      <Navigation selectedComponents={selectedComponents} setApp={setApp} />
      {
        app === "Graph" ? (

          <div className='grid grid-rows-12 grid-flow-col h-lvh'>
            <h1 className="text-2xl font-bold text-center row-span-1">NFR Graph Reporting</h1>
            <div className="flex w-full items-center justify-self-center space-x-2">
              <Input className="w-4/5" type="query" placeholder="MATCH (n) RETURN n" />
              <Button type="submit">Submit</Button>
            </div>
            <div className="row-span-8 justify-center items-center">
              {/* <GraphBrowser host="localhost" port={5173} cypherQuery="MATCH (n) RETURN n LIMIT 25" /> */}
            </div>

          </div>
        ) : null
      }
      {/* <ChatBot /> */}
    </>
  )
}

export default App
