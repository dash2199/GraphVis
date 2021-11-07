import { DataSet, Network } from "vis-network/standalone";
import React, { useEffect, useRef } from 'react';

var PQ = {
    PriorityQueue: {
        make: function (opts) {
          var T = PQ.PriorityQueue,
              t = {},
              key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
    
        default_sorter: function (a, b) {
          return a.cost - b.cost;
        },
    
        push: function (value, cost) {
          var item = {value: value, cost: cost};
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
    
        pop: function () {
          return this.queue.shift();
        },
    
        empty: function () {
          return this.queue.length === 0;
        }
      }
};

const Graph = (props) => {
    const container = useRef(null);
    let start_node = parseInt(props.StartNode);

    useEffect(() => {
        var nodes = new DataSet(props.Nodes);
        var edges = new DataSet(props.Edges);
        var data = {
            nodes: nodes,
            edges: edges,
        };
        var options = {
            edges: {
                arrows: {
                    to:{
                        enabled: props.Flag
                    }
                },
            },

            layout: {
                randomSeed : 0.9339743977409103,
            }
        };


        var network = new Network(container.current , data, options);
        network.once('stabilized' , () =>{
            network.moveTo({scale: 1.1}); 
        })
        
        // network.on('zoom' , (e) => {
        //     console.log(e.scale);
        // });

        console.log(network.getSeed());
        // console.log(network.getSeed());

        // Adj List;
        var adj = new Map();
        var parent = new Map();
        for(let i = 0; i <= 3e5; i++){
            adj.set(i , []);
            parent.set(i , -1);
        }
        let N = 0;
        nodes.forEach(i =>{
            let u = parseInt(i.label);
            if(N < u){
                N = u;
            }
        })
        edges.forEach(i =>{
            let u = parseInt(i.from) , v = parseInt(i.to);
            if(props.Flag === false){
                adj.get(u).push(v);
                adj.get(v).push(u);
            }else{
                adj.get(u).push(v);
            }
        })
        
        function change_color(order){
            function changeColor(i){
                setTimeout(function(){
                    if(i > 0){
                        let j = i - 1;
                        nodes.update({id : "" + order[j], color : "orange" });
                    }
                    nodes.update({id : "" + order[i], color : "yellow"});
                    if(i === order.length - 1){
                        setTimeout(function(){
                            nodes.update({id : "" + order[i], color : "orange" });
                        } , 1000);
                        setTimeout(function(){
                            for(let k = 0; k < order.length; k++){
                                nodes.update({id : "" + order[k], color : "white" });
                            }
                        } , 3000);
                    }
                } , i * 1000);
            }
            for(let i = 0; i < order.length; i++){
                changeColor(i);
            }
        }
        // DFS
        if(props.Type === "DFS"){
            let vis = [];
            let st = [];
            let order = [];
            console.log(start_node);
            for(let i = start_node; i <= N; i++){
                if(!vis.includes(i)){
                    st.push(i);
                    while(st.length !== 0){
                        let node = st.pop();
                        if(!vis.includes(node)){
                            vis.push(node);
                            order.push(node);
                            let children = adj.get(node);
                            // console.log(node);
                            for(let c = 0; c < children.length; c++){
                                st.push(children[c]);
                            }
                        }
                    }
                }
            }

            for(let i = 1; i <= N; i++){
                if(!vis.includes(i)){
                    st.push(i);
                    while(st.length !== 0){
                        let node = st.pop();
                        if(!vis.includes(node)){
                            vis.push(node);
                            order.push(node);
                            let children = adj.get(node);
                            // console.log(node);
                            for(let c = 0; c < children.length; c++){
                                st.push(children[c]);
                            }
                        }
                    }
                }
            }

            change_color(order);   
        }

        
        //BFS
        if(props.Type === "BFS"){
            let vis = [];
            let q = [];
            let order = [];
            for(let i = start_node; i <= N; i++){
                if(!vis.includes(i)){
                    vis.push(i);
                    q.push(i);
                    while(q.length !== 0){
                        let node = q.shift();
                        let children = adj.get(node);
                        order.push(node);
                        for(let c = 0; c < children.length; c++){
                            if(!vis.includes(children[c])){
                                vis.push(children[c]);
                                q.push(children[c]);
                            }
                        }
                    }
                }
            }

            for(let i = 1; i <= N; i++){
                if(!vis.includes(i)){
                    vis.push(i);
                    q.push(i);
                    while(q.length !== 0){
                        let node = q.shift();
                        let children = adj.get(node);
                        order.push(node);
                        for(let c = 0; c < children.length; c++){
                            if(!vis.includes(children[c])){
                                vis.push(children[c]);
                                q.push(children[c]);
                            }
                        }
                    }
                }
            }

            change_color(order); 
        }

        //Dijktra
        if(props.Type === "Djikstra"){
            if(props.Wted === true){
                edges.forEach(i =>{
                    let u = parseInt(i.from) , v = parseInt(i.to) , wt = parseInt(i.label);
                    if(props.Flag === false){
                        adj.get(u).push({V : v , W : wt});
                        adj.get(v).push({V : u , W : wt});
                    }else{
                        adj.get(u).push({V : v , W : wt});
                    }
                })
            }else{
                edges.forEach(i =>{
                    let u = parseInt(i.from) , v = parseInt(i.to) , wt = 1;
                    if(props.Flag === false){
                        adj.get(u).push({V : v , W : wt});
                        adj.get(v).push({V : u , W : wt});
                    }else{
                        adj.get(u).push({V : v , W : wt});
                    }
                })
            }

            let d = {};
            for(let i = 0; i <= N; i++){
                d[i] = 2e9;
            }
            d[start_node] = 0;
            var pq = PQ.PriorityQueue.make();
            pq.push(start_node , 0);

            let order = [];
            while(!pq.empty()){
                var node = pq.pop();
                order.push(node.value);
                let children = adj.get(node.value);
                console.log(children);
                for(let i = 0; i < children.length; i++){
                    let to = children[i].V , weight = children[i].W;
                    if(d[to] > node.cost + weight){
                        d[to] = node.cost + weight;
                        pq.push(to , d[to]);
                    }
                }
            }
            change_color(order); 
        }
        
        }
    ,);
    return (
        <>
        <div ref = {container} className = "visual"></div>
        </>
    );
}

export default Graph
