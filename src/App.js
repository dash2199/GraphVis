import './App.css'
import Graph from './graph';
import React, { useEffect , useState} from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import Help from './Help';
import Partles from './Particles'
import Modal from 'react-modal';

const modalcss = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        width: '500px',
        height: '300px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        backgroundColor: '#121212',
        background: 'red',
        transform: 'translate(-50%, -50%)',
        border: '1px solid grey',
    },


};

let input = "";
let type = "";
let start = "1";

Modal.setAppElement('#root');

function App(props) {
  const [curNode , setNode] = useState([]);
  const [curEdge , setEdge] = useState([]);
  const [curFlag , setFlag] = useState(false);
  const [curText , setText] = useState("Directed");
  const [isZero , setZero] = useState(false);
  const [curTextIdx , setTextIdx] = useState("0-indexed");
  const [isActive , setActive] = useState(true);
  const [isWted , setWted] = useState(false);
  const [isType , setType] = useState("");
  const [istmp , settmp] = useState(false);
  const [trig, setTrig] = useState(true);
  const [modal , setModal] = useState(false);
  
  useEffect (() =>{
    input = document.getElementById('input_edges');
  });

  const handleClick = (e) =>{
    e.preventDefault();
    if (input !== "") {
        let node = [] , edge = [];
        let text = input.value;
        let e = text.split(/\s+/);
        let n = e.length;  
        let it;
        if(isWted === false){
          let set = new Set();
          for(let i = 0; i < n; i++){
              if(e[i] === ""){
                continue;
              }
              set.add(e[i]);
          }
          set.forEach(j => {
            let obj = {};
              obj.id = j;
              obj.label = j;
              obj.color = "white";
              node.push(obj);
          })

          it = set.values().next().value;
          for(let i = 0; i < n; i += 2){
              let obj = {};
              obj.from = e[i];
              obj.to = e[i + 1];
              obj.color = "white";
              edge.push(obj);
          }
        }else{
          let set = new Set();
          for(let i = 0; i < n; i += 3){
              if(e[i] === ""){
                continue;
              }
              set.add(e[i]);
              set.add(e[i + 1]);
          }
          set.forEach(j => {
            let obj = {};
              obj.id = j;
              obj.label = j;
              obj.color = "white";
              node.push(obj);
          })
          it = set.values().next().value;
          for(let i = 0; i < n; i += 3){
              let obj = {};
              obj.from = e[i];
              obj.to = e[i + 1];
              obj.color = "white";
              obj.label = e[i + 2];
              edge.push(obj);
          }
          console.log(edge);
        }
        setType(".");
        setNode(node);
        setEdge(edge);
        if(it === (0).toString()){
          setZero(true);
          setTextIdx("1-indexed");  
        }else{
          setZero(false);
          setTextIdx("0-indexed");
        }
    }
  }
  
  const handleClick2 = (e) =>{
      e.preventDefault();
      setType("");
      setText(() =>{
        if(curFlag === true){
          return "Directed";
        }else{
          return "Undirected";
        }
      });

      if(isActive === true){
        setActive(false);
      }else{
        setActive(true);
      }
      setFlag((prev) =>{
        if(prev === true){
          return false;
        }else{
          return true;
        }
      });
  }

  const handleClick3 = (e) =>{
      e.preventDefault();
      setType("");
      if(isZero === false){
        let tmp = [];
        curNode.forEach((j) =>{
            let obj = {};
            obj.id = j.id;
            obj.label = (parseInt(j.label) - 1).toString();
            obj.color = "white";
            tmp.push(obj);
        })

        console.log(tmp);
        setNode(tmp);
        setTextIdx("1-indexed");
        setZero(true);
      }else{
        let tmp = [];
        curNode.forEach((j) =>{
            let obj = {};
            obj.id = j.id;
            obj.label = (parseInt(j.label) + 1).toString();
            obj.color = "white";
            tmp.push(obj);
        })
        setNode(tmp);
        setTextIdx("0-indexed");
        setZero(false);
      }
  }
  
  const handleWt = (e) => {
    e.preventDefault();
    setType("");
    if(isWted === false){
      setWted(true);
    }else{
      setWted(false);
    }
  }
  const handleClick4 = (e) => {
    e.preventDefault();
    if(istmp === false){
        settmp(true);
    }else{
        settmp(false);
    }
    setModal(false);
    setType(type);
    if(type === "ALGO" || type === ""){
      alert("Choose an algorithm first pls...");
    }
  }
  
  const handleChange = (e) =>{
    e.preventDefault();
    type = e.target.value;
    console.log(e.target.value);
  }

  const handleClick5 = (e) => {
    e.preventDefault();
    //generates random graph
    let MXN = 20;
    
    let N = Math.floor(Math.random() * MXN) + 1;
    let M = Math.floor(Math.random() * (N * (N - 1)/2)) + 1;
    
    let edges2 = [] , nodes2 = [];
    for(let i = 1; i <= N; i++){
      let obj = {};
      obj.id = i.toString();
      obj.label = i.toString();
      obj.color = "white";
      nodes2.push(obj);
    }
    for(let i = 0; i < M; i++){
      let u = Math.floor(Math.random() * N) + 1;
      let v = Math.floor(Math.random() * N) + 1;
      let obj = {};
      obj.from = u.toString();
      obj.to = v.toString();
      obj.color = "white";
      if(isWted === true){
        obj.label = (Math.floor(Math.random() * MXN) + 1).toString();
      }
      edges2.push(obj);
    }
    setNode(nodes2);
    setEdge(edges2);
    setType(".");
  }

  const handleModal = (e) => {
    setModal(true);
    setType("");
  }

  return (
    <>
    
    {/* <Router>
      <Route exact path = '/'>
        <Help />
      </Route> */}
      <Help trigger = {trig} setTrigger = {setTrig}/>
      {/* <Route path = '/Main'> */}
      {/* <div className = "particles"><Partles /></div> */}
      <div className = "main">
          <h1>GraphVis</h1>
      </div>
      <div className = "row">
          <div className = "col left">      
          <button type = "submit" onClick = {handleWt} className = {isWted ? "btn-unwt" : "btn-wt"}>{isWted ? "Unweighted Graph?" : "Weighted Graph?"}</button>
            <h1 className = "data_text">Graph Data :</h1>
            <textarea className = "edges_input" placeholder = {isWted ? "Enter edges in this format:\nu1 v1 wt1\nu2 v2 wt2\n. .\n. .\nun vn wtn" : "Enter edges in this format:\nu1 v1\nu2 v2\n. .\n. .\nun vn"} id = "input_edges"></textarea>
            <button type = "submit" onClick = {handleClick}  className = 'btn-main'>Visualize!</button>
            <button type = "submit" onClick = {handleClick3} className = "btn-index">{curTextIdx}</button>
            <button type = "submit" onClick = {handleClick2} className = {isActive ? "btn-direct" : "btn-undirect"}>{curText}</button>
            <button type = "submit" onClick = {handleClick5} className = "btn-gen">Generate Graph</button>
            
            <button type = "submit" onClick = {handleModal} className = "btn-vis">Visualize Algorithms!</button>
            
              <Modal isOpen = {modal} onRequestClose = {() => setModal(false)} style = {modalcss}>
              <button type = "submit" onClick = {() => setModal(false)} className = "btn-closemodal">X</button>
              <div className = "ModalBackground">
                <form>
                    <div className = "enode">
                      Enter Start Node : 
                      <input type = "text" className = "input" onChange = {(e) => start = e.target.value}></input>
                    </div>
                </form>
                <div className="select">
                  <select onChange = {handleChange}>
                      <option value = "ALGO">Algorithms</option>
                      <option value = "DFS">DFS</option>
                      <option value = "BFS">BFS</option>
                      <option value = "Djikstra">Djikstra</option>
                  </select>
                </div>
                <button type = "submit" onClick = {handleClick4} className = "btn-run">Run!</button>
              </div>
              </Modal>
             
          </div>
          <div className = "col right">
            <Graph Nodes = {curNode} Edges = {curEdge} Flag = {curFlag} Type = {isType} Wted = {isWted} StartNode = {start}/>
          </div>


      </div>
      {/* </Route> */}
      
    {/* </Router> */}
    </>
  );
}

export default App;
