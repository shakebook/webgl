import React, { useEffect, useState } from 'react';
const App = () => {
  const [pageY, setPageY] = useState(0);
  const [reRender, setReRender] = useState(false)
  const [tree, setTree] = useState([
    {
      id: 'javascript',
      name: 'javascript',
      level: 1,
      children: [
        {
          id: 'react',
          name: 'react',
          level: 2,
          children: [
            {
              id: 'react-dom',
              name: 'react-dom',
              level: 3,
              children: []
            },
          ]
        },
        {
          id: 'vue',
          name: 'vue',
          level: 2,
          children: []
        },
      ]
    },
    {
      id: 'java',
      name: 'java',
      level: 1,
      children: [{
        id: 'spring',
        name: 'spring',
        level: 2,
        children: []
      }]
    },
    {
      id: 'golang',
      name: 'golang',
      level: 1,
      children: []
    },
    {
      id: 'redis',
      name: 'redis',
      level: 1,
      children: []
    },
    {
      id: 'mysql',
      name: 'mysql',
      level: 1,
      children: []
    },
    {
      id: 'css',
      name: 'css',
      level: 1,
      children: []
    }
  ])
  const dragstart_handler = (ev) => {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("application/data", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
    setPageY(ev.pageY);

  }
  const dragover_handler = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
  }
  const drop_handler = (ev) => {
    ev.preventDefault();
    const moveId = ev.dataTransfer.getData("application/data");
    const targetId = ev.target.id;
    if (moveId !== targetId) {

      // console.log(ev.pageY - pageY)
      // console.log("positions", positions)
      // console.log(ev.target.getBoundingClientRect().top)
      const findObj = { node: null }
      findElement(tree, moveId, findObj);
      const isSort = getDropType(findObj.node, ev.pageY - pageY);
      console.log("isSort:", isSort)
      // if (isSort) {
      //   ev.target.setAttribute('style', 'border-color: red');
      // }
      dropPlace(moveId, targetId, isSort);
    }
  }

  const initTreePosition = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const element = document.getElementById(arr[i].id);
      const rect = element.getBoundingClientRect();
      const o = {
        bottom: rect.top + rect.height,
        height: element.offsetHeight,
        element,
      }
      arr[i] = { ...arr[i], ...o }
      arr[i].children && arr[i].children.length > 0 && initTreePosition(arr[i].children);
    }
  }

  const findElement = (arr, id, o) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        o.node = arr[i];
      }
      arr[i].children && arr[i].children.length > 0 && findElement(arr[i].children, id, o);
    }
  }

  const findTargeNode = (arr, position, obj) => {
    for (let i = 0; i < arr.length; i++) {
      if (Math.abs(arr[i].bottom - position) < 10) {
        obj.node = arr[i];
      }
      arr[i].children && arr[i].children.length > 0 && findTargeNode(arr[i].children, position, obj);
    }
  }

  const filterNode = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
        return true;
      }
      arr[i].children && arr[i].children.length > 0 && filterNode(arr[i].children, id);
    }
  };

  const setNode = (arr, node) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === node.id) {
        arr[i] = node;
      }
      arr[i].children && arr[i].children.length > 0 && setNode(arr[i].children, node);
    }
  }

  const getDropType = (moveNode, distanceY) => {

    const currentPosition = moveNode.bottom - (moveNode.height / 2) + distanceY;
    console.log("moveNode.bottom", moveNode.bottom)
    console.log("currentPosition", currentPosition)
    let target = { node: null }
    findTargeNode(tree, currentPosition, target);
    return target.node;
  }

  const dropPlace = (moveId, targetId, isSort) => {
    let arr = [...tree];
    const move = { node: null }
    const target = { node: null }
    findElement(arr, moveId, move);
    filterNode(arr, moveId);
    findElement(arr, targetId, target);

    // const moveNode = findElement(arr, moveId);
    // const targetNode = findElement(arr, targetId);
    console.dir(target)

    if (!isSort) {

      move.node.level = target.node.level + 1;
      move.node.children && move.node.children.length > 0 && changeLevel(move.node.children, move.node.level)
      if (!target.node.children) {
        target.node.children = [];
      }
      target.node.children.push(move.node);
      setNode(arr, target.node);
    } else {
      move.node.level = isSort.level;
      move.node.children && move.node.children.length > 0 && changeLevel(move.node.children, move.node.level)
      replaceNode(arr, move.node, isSort.id);
    }
    setTree(arr)
    setReRender(!reRender)

  }

  const replaceNode = (arr, moveNode, targetId) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === targetId) {
        arr.splice(i + 1, 0, moveNode)
        return;
      }
      if (arr[i].children && arr[i].children.length > 0) {
        replaceNode(arr[i].children, moveNode, targetId);
      }
    }
  }

  const changeLevel = (arr, level) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].level = level + 1;
      arr[i].children && arr[i].children.length > 0 && changeLevel(arr[i].children, arr[i].level);
    }
    return arr;
  }



  const getIndent = (level) => {
    const indent = level - 1;
    if (indent === 0) {
      return 0;
    }
    return indent * 15 + 'px';
  }

  // const renderTree = (arr, trees) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     trees.push(arr[i]);
  //     if (arr[i].children && arr[i].children.length > 0) {
  //       renderTree(arr[i].children, trees)
  //     }
  //   }
  //   return trees;
  // }

  const doRenderTree = (tree, elements) => {
    tree.forEach(item => {
      elements.push(<p key={item.id} style={{ paddingLeft: getIndent(item.level) }} draggable="true" id={item.id} onDragStart={dragstart_handler}>{item.name}--{item.bottom}</p>)
      item.children && item.children.length > 0 && doRenderTree(item.children, elements)
    });
    return elements;
  }

  useEffect(() => {
    let arr = [...tree];
    initTreePosition(arr)
    setTree(arr)
  }, [reRender])

  return (
    <div id="target" onDrop={drop_handler} onDragOver={dragover_handler} className='tree'>
      {
        doRenderTree(tree, [])
      }
    </div>
  )
}

export default App;