import React, { useState, useEffect } from 'react';
import { createDocument, deleteDocument, fetchDocumentsProject } from '../lib/api';
import { Link, useHistory } from 'react-router-dom';
import DropUpload from '../components/dropUpload';
import { FileWithPath } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons';

function Docs() {
  const [docs, setDocs] = useState<any[]>([]);

  const history = useHistory();

  useEffect(() => {
    updateDocs().catch(e => {
      history.push('/login');
    });
  }, [history]);

  function updateDocs() {
    let project_id = window.location.pathname.split("/").pop() !;

    return fetchDocumentsProject(project_id).then(docs => {
      setDocs(docs);
    });
  }

  function handleAdd(filesToUpload: FileWithPath[]) {
    let project_id = window.location.pathname.split("/").pop() !;

    filesToUpload.forEach(
      f => {
        const reader = new FileReader();
        reader.readAsText(f);      
        reader.onload = function() {
          createDocument(
            f.name, reader.result as string, project_id).then(()=> {
            updateDocs();
          })
        }
      }
    );
  }

  function handleDelete(id: string) {
    deleteDocument(id).then(() => {
      updateDocs();
    });
  }

  return (
    <div className="container_projects">
      <h2>New pack</h2>
        <DropUpload 
            fileLimit={5e7}
            fileActionButtonFunc={handleAdd}
            fileActionButtonText={'ADD'}
            mimeType='application/json'
            // Do not support zip now.
            // mimeType='application/json, application/x-rar-compressed, application/octet-stream, application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip'
            allowMultiple={true}
          />
        
      <h2>All docs:</h2>
      <div className="container_grid"> 
        {
        docs ? docs.map(d => (
          <div className="item" key={d.id}>
            <div className="card_doc">
              <div className="card_title">
                <Link to={`/documents/${d.id}`} style={{textDecoration: 'none', color: '#58595a'}}>
                  {d.name}
                </Link>
                <FontAwesomeIcon 
                className="icon_s"
                icon={faTimesCircle} 
                size="1x"
                onClick={() => {handleDelete(d.id)}}/>  
              </div>
              <div 
                className="card_container" id="overflowTest">
                <p>{d.textPack}</p>
              </div>
            </div>
          </div>
        )) : 'Empty'} 
    </div>
  </div>
  );
}

export default Docs;