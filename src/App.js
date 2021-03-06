import React, { useState, useEffect } from 'react';
// import './App.css';
import HeadlineList from './components/headline-list/headline-list';
import Api from './api-client';
import renderHTML from 'react-render-html';
import DatePicker from 'react-date-picker'
import { Button } from '@material-ui/core';
import Draggable from 'react-draggable';

import logoPath from './assets/icon.png';
let date = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();

function App (props) {

  const [dateFull, setDate] = useState(new Date());
  const [headlines, setHeadlines] = useState([]);
  const [website, setWebsite] = useState('');
  const [webName, setWebName] = useState('');
  const [webLink, setWebLink] = useState('');
  const [concatWebLink, setConcatWebLink] = useState('');
  const [show, setShow] = useState(true);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState(1);
  const [titleRoot, setTitleRoot] = useState('');
  const [titlePath, setTitlePath] = useState([]);
  const [summaryPath, setSummaryPath] = useState([]);
  const [linkPath, setLinkPath] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [selectedNode, setSelectedNode] = useState([]);
  const [arrayOfOptions, setArrayOfOptions] = useState([]);
  const [arrayOfNodes, setArrayOfNodes] = useState([]);
  const [arrayOfTags, setArrayOfTags] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [currentOption, setCurrentOption] = useState(1);
  const [imageTag, setImageTag] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [deleteHeadline, setDeleteHeadline] = useState(false);
  const [deleteScraper, setDeleteScraper] = useState(false);
  const [isActiveStatus, setIsActiveStatus] = useState(false);
  const [isActiveStatusScraper, setIsActiveStatusScraper] = useState(false);


  const onChange = (selectedDate) => {
    const currentDate = selectedDate || dateFull;
    if (selectedDate) {
      year = selectedDate.getFullYear();
      month = selectedDate.getMonth() + 1;
      date = selectedDate.getDate();
    }
    Api.getHeadlines(date, month, year)
      .then(result => {
        if (result.data.headline.length === 0) setHeadlines(false)
        else setHeadlines(result.data.headline)
      })
      .catch((error) => {
        console.log("Api call error");
        console.log(error.message);
      });
    setDate(currentDate);
  };

  useEffect(() => {
      Api.getHeadlines(date, month, year)
        .then(result => {
          if (result.data.headline.length === 0) setHeadlines(false)
          else setHeadlines(result.data.headline)
        })
        .catch((error) => {
          console.log("Api call error");
          console.log(error.message);
        });
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleClick (e) {
    e.preventDefault();
    let currentNode = e.target
    let [path, root] = findPath(currentNode)
    console.log(path, root)
    let targetNode
    try {
      targetNode = document.querySelector(root);
    } catch (error) {
      console.log(error)
    }
    for (let i = path.length - 1; i >= 0; i--) {
      targetNode = targetNode.children[path[i]]
    }
    setSelectedNode(targetNode)
    if (status === 1) {
      setTitleRoot(root)
      setTitlePath(path)
      setTitle(targetNode.innerText)
    } else if (status === 2) {
      setSummaryPath(path)
      setSummary(targetNode.innerText)
    } else if (status === 3) {
      if (targetNode.getAttribute('src') && targetNode.getAttribute('src')[0] === 'h') {
        setImage(targetNode.src)
        setImageTag('src')
      } else if (targetNode.getAttribute('data-src') && targetNode.getAttribute('data-src')[0] === 'h') {
        setImage(targetNode.getAttribute('data-src'))
        setImageTag('data-src')
      } else if (targetNode.parentNode.getAttribute('src') && targetNode.parentNode.getAttribute('src')[0] === 'h') {
        setImage(targetNode.parentNode.getAttribute('src'))
        setImageTag('src')
        path.shift()
      } else if (targetNode.parentNode.getAttribute('data-src') && targetNode.parentNode.getAttribute('data-src')[0] === 'h') {
        setImage(targetNode.parentNode.getAttribute('data-src'))
        setImageTag('data-src')
        path.shift()
      }
      setImagePath(path)
    } else if (status === 4) {
      if (targetNode.href) {
        if (targetNode.href.slice(0,32) === 'https://db-newsfeeds.netlify.com') setLink(concatWebLink + targetNode.href.slice(32)) 
        else setLink(targetNode.href)
      } else if (targetNode.parentNode.href) {
        path.shift();
        if (targetNode.parentNode.href.slice(0,32) === 'https://db-newsfeeds.netlify.com') setLink(concatWebLink + targetNode.parentNode.href.slice(32))
        else setLink(targetNode.parentNode.href)
      }
      setLinkPath(path)
    }
  }
  function findPath (currentNode) {
    let path = [];
    let root = '';
    let parentNode = currentNode.parentNode
    let children = parentNode.children
    while (currentNode.id !== "externalMaster") {
      if (currentNode.id) {
        root = '#' + currentNode.id.trim();
        break;
      }
      if (parentNode.id === "externalMaster") {
        let id = currentNode.id
        let thisClass = currentNode.getAttribute('class')
        if (id) {
          root = '#' + id.trim();
        }
        else if (thisClass) {
          thisClass = thisClass.trim().split(' ').join('.')
          thisClass = '.' + thisClass
          root = thisClass
        };
      } else {
        for (let i = 0; i < children.length; i++) {
          if (children[i] === currentNode) {
            path.push(i)
            break;
          }
        }
      }
      currentNode = parentNode;
      parentNode = currentNode.parentNode;
      children = parentNode.children;
    }
    return [path, root]
  }
  function deepSearch () {
    let currentNode = selectedNode.parentNode
    let localArrayOfOptions = []
    let localArrayOfNodes = []
    let localArrayOfTags = []

    function search (currentNode) {
      if (status <= 2 && currentNode.innerText && currentNode.innerText.trim().length > 5) {
        localArrayOfOptions.push(currentNode.innerText.trim())
        localArrayOfNodes.push(currentNode)
      }
      else if (status === 3) {
        if (currentNode.getAttribute('src') && currentNode.getAttribute('src')[0] === 'h') {
          localArrayOfOptions.push(currentNode.getAttribute('src'))
          localArrayOfTags.push('src')

          localArrayOfNodes.push(currentNode)
        }
        if (currentNode.getAttribute('data-src') && currentNode.getAttribute('data-src')[0] === 'h') {
          localArrayOfOptions.push(currentNode.getAttribute('data-src'))
          localArrayOfTags.push('data-src')
          localArrayOfNodes.push(currentNode)
        }
        if (currentNode.getAttribute('srcset') && currentNode.getAttribute('srcset')[0] === 'h') {
          localArrayOfOptions.push(currentNode.getAttribute('srcset'))
          localArrayOfTags.push('srcset')
          localArrayOfNodes.push(currentNode)
        }
        if (currentNode.getAttribute('data-src-md') && currentNode.getAttribute('data-src-md')[0] === 'h') {
          localArrayOfOptions.push(currentNode.getAttribute('data-src-md'))
          localArrayOfTags.push('data-src-md')
          localArrayOfNodes.push(currentNode)
        }
      }

      else if (status === 4 && currentNode.href) {
        if (currentNode.href[7] === 'l') localArrayOfOptions.push(concatWebLink + currentNode.href.slice(21))
        else localArrayOfOptions.push(currentNode.href)

        localArrayOfNodes.push(currentNode)
      }
      for (let i = 0; i < currentNode.children.length; i++) {
        search(currentNode.children[i])
      }
    }
    search(currentNode)
    if (!localArrayOfOptions.length) alert("sorry no options available")
    else {
      setArrayOfOptions(localArrayOfOptions)
      setArrayOfNodes(localArrayOfNodes)
      setArrayOfTags(localArrayOfTags)
      setShowOptions(true)
    }
  }

  function changeStatus () {
    if (status <= 4) {
      setStatus(status + 1)
    }
  }
  function changeStatusBack () {
    if (status >= 1) {
      setStatus(status - 1)
    }
  }
  function toggleShow () {
    setShow(!show)
    setShowForm(true)
  }
  function submit () {
    Api.saveNewFeed(webLink, webName, titlePath, titleRoot, summaryPath, linkPath, imagePath, imageTag)
    toggleShow();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  function previousOption () {
    if (currentOption > 1) setCurrentOption(currentOption - 1)
  }
  function nextOption () {
    if (currentOption < arrayOfOptions.length) setCurrentOption(currentOption + 1)
  }
  function selectOption () {
    let node = arrayOfNodes[currentOption - 1]
    let [path, root] = findPath(node)
    if (status === 1) {
      setTitleRoot(root)
      setTitlePath(path)
      setTitle(arrayOfOptions[currentOption - 1])
    } else if (status === 2) {
      setSummaryPath(path)
      setSummary(arrayOfOptions[currentOption - 1])
    } else if (status === 3) {
      setImagePath(path)
      setImage(arrayOfOptions[currentOption - 1])
      setImageTag(arrayOfTags[currentOption - 1])
    } else if (status === 4) {
      setLinkPath(path)
      setLink(arrayOfOptions[currentOption - 1])
    }
    setCurrentOption(1)
    setShowOptions(false)
  }
  const handleAddressChange = (event) => {
    setWebLink(event.target.value);
  }
  const handleNameChange = (event) => {
    setWebName(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-useless-escape
    const regex = "^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)"
    let localLink = webLink;
    if (webLink[0] === 'w' && webLink[1] === 'w' && webLink[2] === 'w') {
      setWebLink('https://' + webLink);
      localLink = 'https://' + webLink;
    }
    else if (webLink[0] !== 'w' && webLink[1] !== 'w' && webLink[2] !== 'w'
      && webLink[0] !== 'h' && webLink[1] !== 't' && webLink[2] !== 't') {
      setWebLink('https://www.' + webLink);
      localLink = 'https://www.' + webLink;
    }
    setConcatWebLink(localLink.match(regex)[0]);
    Api.getWebsite(localLink).then(result => {
      setWebsite(result.data.html.htmlBody)
    })
    setShowForm(false)
  }
  const handleCancel = () => {
    setShow(true)
    setShowForm(false)
  }
  const refresh = () => {
    Api.forceRefresh().then(result => {
      console.log(result)
    });
    Api.getHeadlines(date, month, year).then(result => {
      if (result.data) {
        if (result.data.headline.length === 0) setHeadlines(false)
        else setHeadlines(result.data.headline)
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  const toggleDeleteHeadline = () => {
    const isActiveLocal = isActiveStatus
    setDeleteHeadline(!deleteHeadline);
    setIsActiveStatus(!isActiveLocal);
  }
  const toggleDeleteScraper = () => {
    const isActiveLocal = isActiveStatusScraper;
    setDeleteScraper(!deleteScraper);
    setIsActiveStatusScraper(!isActiveLocal);
  }
  const logout = () => {
    Api.logout()

      .then(data => {
        props.setUser(false);
        props.setisAuth(false);
      });
  };




  return (
    <div>
      <div className="app__container">
        <nav className="appbar">
          <div className="action-container no1">
            <img className="logo" src={logoPath} alt='logo'
            //onClick={e => { e.preventDefault(); setAddFeed(false) }}
            />
            <Button size="small" variant="contained" onClick={toggleDeleteHeadline} className={`${isActiveStatus && "danger"} appbar__button`}>Delete Headline</Button>
            <Button size="small" variant="contained" onClick={toggleDeleteScraper} className={`${isActiveStatusScraper && "danger2"} app-bar__button`} >Delete Feed </Button>
          </div>
          <div className="action-container no2">
            <Button size="small" variant="contained" className="form-toggle appbar__button" onClick={toggleShow}>Add</Button>
            <DatePicker clearIcon={null} calendarIcon={null} className="date-picker" value={dateFull} maxDate={new Date()} onChange={(date) => onChange(date)} />
            <Button size="small" variant="contained" onClick={refresh} className="appbar__button" >Refresh</Button>
          </div>
          <div className="action-container no3">
            <Button size="small" variant="contained" onClick={logout} className={`appbar__button`} >Logout</Button>
          </div>

        </nav>
        {show &&
          <HeadlineList
            headlines={headlines}
            deleteHeadline={deleteHeadline}
            deleteScraper={deleteScraper}
            isActiveStatus={isActiveStatus}
            isActiveStatusScraper={isActiveStatusScraper}
          />}
        {!show &&
          <div className="second__container">
            <div className="first-form__container">
              {showForm &&
                <div className="add-feed__container">
                  <div className="">
                  </div>
                  <form id="form" className="first-form" onSubmit={handleSubmit} autoComplete="new-password">
                    <label htmlFor="httpAddress">Web Address:</label>
                    <input autoComplete="off" type="text" id="httpAddress"
                      placeholder="Enter a web address..." onChange={handleAddressChange}
                      value={webLink}></input>
                    <label htmlFor="name">Custom scraper name:</label>
                    <input autoComplete="off" type="text" id="name"
                      placeholder="Enter a name (e.g. BBC Most Read No.1)..." onChange={handleNameChange}
                      value={webName}></input>
                    <div>
                      <button className="addbutton" type="submit">Submit</button>
                      <button className="" onClick={handleCancel} >Cancel</button>
                    </div>
                  </form>
                </div>
              }
              {!showForm &&
                <Draggable>
                  <div className="second-form" id="form2">
                    <div className="form2Head" id="form2Head">Click and drag</div>
                    {!showOptions &&
                      <div>
                        {(() => {
                          switch (status) {
                            case 1: return <div>
                              <p className='formMessage'>Select a title</p>
                              <p className='formContent'>{title}</p>
                            </div>;
                            case 2: return <div>
                              <p className='formMessage'>Select a summary (optional)</p>
                              <p className='formContent'>{summary}</p>
                            </div>;
                            case 3: return <div>
                              <p className='formMessage'>Select an image</p>
                              <img src={image} style={{ width: 100, height: 100 }} alt='scraped'></img>
                            </div>;
                            case 4: return <div>
                              <p className='formMessage'>Select a link</p>
                              <p className='formContent'>{link}</p>
                            </div>;
                            case 5: return <div>
                              <h4>click SUBMIT to add your feed.</h4>
                            </div>
                            default: return null;
                          }
                        })()}
                        <div className="action-buttons__container">
                          {status < 6 && status > 1 && <Button size="small" variant="contained" onClick={changeStatusBack} >Back</Button>}
                          {status < 5 && <Button size="small" variant="contained" onClick={changeStatus} >Next</Button>}
                          <Button size="small" variant="contained" onClick={submit} >Submit</Button>
                          <Button size="small" variant="contained" onClick={deepSearch} >Not what you are looking for?</Button>
                          <Button size="small" variant="contained" onClick={handleCancel} >Cancel</Button>
                        </div>
                      </div>}
                    {showOptions &&
                      <div>
                        <div>
                          <div className='formMessage'>
                            Option {currentOption} out of {arrayOfOptions.length}
                          </div>
                          <div>
                            {status !== 3 &&
                              <div>
                                {arrayOfOptions[currentOption - 1]}
                              </div>
                            }
                            {status === 3 &&
                              <img src={arrayOfOptions[currentOption - 1]} style={{ height: 100 }} alt='scraped'></img>
                            }
                          </div>
                        </div>
                        <Button size="small" variant="contained" onClick={previousOption} >Previous</Button>
                        <Button size="small" variant="contained" onClick={selectOption} >Select</Button>
                        <Button size="small" variant="contained" onClick={nextOption} >Next</Button>
                      </div>
                    }
                  </div>
                </Draggable>
              }

            </div>
            {!showForm &&
              <div id="externalMaster" className="external" onClick={handleClick} >{renderHTML(website)}</div>
            }
          </div>
        }
      </div>
    </div >
  );
}

export default App;
