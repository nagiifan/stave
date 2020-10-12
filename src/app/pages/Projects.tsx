import React, { useState, useEffect } from 'react';
import { fetchProjects, createProject, deleteProject } from '../lib/api';
import { Link, useHistory } from 'react-router-dom';
import {FileWithPath} from 'react-dropzone';
import DropUpload from '../components/dropUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileImport} from '@fortawesome/free-solid-svg-icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


function Projects() {
  const history = useHistory();
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [ontology, setOntology] = useState<string>('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const clearDialog = () => {
    setOntology('');
    setName('');
  };

  useEffect(() => {
    updateProjects().catch(e => {
      history.push('/login');
    });
  }, [history]);

  function updateProjects() {
    return fetchProjects().then(projects => {
      setProjects(projects);
    });
  };

  function handleAdd() {
    if (name && ontology){
      createProject(name, ontology).then(() =>{
        updateProjects();
      });
    } else{
      alert("Please fill in project name, introduction and upload ontology file.");
    }
  }


  function handleDelete(id: string) {
    deleteProject(id).then(() => {
      updateProjects();
    });
  }

  function userAddFiles(acceptedFiles: FileWithPath[]) {
    if (acceptedFiles.length > 0){    
      const reader = new FileReader();
      reader.readAsText(acceptedFiles[0]);
      reader.onload = function() {
        setOntology(reader.result as string);        
      }
    }
  }  

  return (
      <div className="container_projects">
        <div className="container_grid">
          <div className="item">
            <div className="card">
              <div className="card_illustration">
                <img className="img"
                    alt='stave logo' 
                    src={process.env.PUBLIC_URL + '/Stave-wholewhite-text@1x.png'}/>
              </div>
              <header className="header2">
                <h2>New Project</h2>
              </header>
              <FontAwesomeIcon 
              className="icon"
              icon={faFileImport}  
              size="6x"
              onClick={handleClickOpen}/>
              <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                  <div className="form-wrapper2">
                    <input 
                    className="input" 
                    value={name}
                    placeholder="Project Name"
                    onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-wrapper2">
                    <textarea 
                    className="textarea" 
                    value={ontology}
                    placeholder="Ontology"
                    onChange={e => setOntology(e.target.value)}
                    />
                  </div> 
                  <div className="form-wrapper2">
                    <DropUpload
                      fileLimit={1048576}
                      fileDropFunc={userAddFiles}
                      mimeType='application/json'
                      allowMultiple={false}
                    />
                  </div>
                  <div>
                    <button 
                      className="buttonsmall"
                      style={{float: 'right'}}
                      onClick={() => {
                      handleAdd();
                      handleClickClose();
                      clearDialog();
                      }} 
                    >
                      Add
                    </button>
                    <button 
                      className="buttonsmall" 
                      style={{float: 'right'}}
                      onClick={handleClickClose} >
                      Cancel
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        {projects.map(d => (
          <div className="item" key={d.id}>
            <div className="card">
              <div className="card_illustration">
                <img className="img"
                    alt='stave logo' 
                    src={process.env.PUBLIC_URL + '/Stave-wholewhite-text@1x.png'}/>
              </div>
              <header className="header">
                <h2>
                  <Link to={`/project/${d.id}`} style={{textDecoration: 'none', color: '#58595a'}}>
                    {d.name}
                  </Link>
                </h2>               
                <div>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        width: '15ch',
                      },
                    }}
                  >
                    <MenuItem 
                      onClick={() => {
                      handleDelete(d.id);
                      handleClose();
                      }}  
                      >
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </header>
              <div className="card_container" id="overflowTest">
                <h3>This part will be a brief description of each project.</h3>
                <p>{d.intro}</p>
              </div> 
            </div>
          </div>
        ))} 
      </div>
    </div> 
  );
}

export default Projects;