import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import ResponseDialog from './custom-components/response-dialog';
import axios from 'axios';

const App = () => {
  const [pipelineData, setPipelineData] = useState({ nodes: [], edges: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    setDialogOpen(true);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('pipeline', JSON.stringify(pipelineData));
  
      const res = await axios.post('http://localhost:8000/pipelines/parse', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      setResponse(res.data);

    } catch (error) {
      console.error('Error submitting pipeline:', error);
      setResponse({ error: 'Submission failed.' });

    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-purple-50/30">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Pipeline Builder</h1>
        <div className="bg-white rounded-lg shadow-sm border border-purple-100">
          <PipelineToolbar />
          <div className="border-t border-purple-100">
            <PipelineUI setPipelineData={setPipelineData} />
          </div>
          <div className="p-4 border-t border-purple-100">
            <SubmitButton isLoading={isLoading} onSubmit={handleSubmit} />
          </div>
        </div>
        {response && (
          <ResponseDialog 
          isOpen={dialogOpen} 
          setIsOpen={setDialogOpen} 
          response={response}
        />
        )}
      </div>
    </div>
  );
};

export default App;
