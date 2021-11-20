import { useRef, useState, forwardRef } from 'react'
import { renderToString } from 'react-dom/server'
import ReactToPrint from 'react-to-print';

import './App.css'
function App() {
  let fileReader

  const inputEl = useRef(null);
  const componentRef = useRef();

  const [data, setData] = useState(null)

  const handleFileRead = (e) => {
    const json = JSON.parse(fileReader.result);
    setData(json)
    console.log(renderToString(<Cards data={json} />))
  };

  const handleButtonClick = () => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(inputEl.current.files[0]);
  }
  return (
    <div className="App">


      {data ? <><ReactToPrint

        content={() => componentRef.current}
      />
        <Cards data={data} ref={componentRef} />
      </> : <><input
        ref={inputEl}
        type="file"
        accept=".json" />
        <button onClick={handleButtonClick}>Generate Cards</button></>}
    </div>
  );
}

const css = `
.page, .page-flip {  display: grid; 
  grid-template-columns: 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    ". ."
    ". ."
    ". ."
    ". ."; 
    height: 100vh;
    width: 100vw;
}

.card {
    font-size: 30px;
    padding: 20px;
    width: 50vw;
    height: 25vh;
    display: inline-block;
    box-sizing: border-box;
    border: inset #efefef 0.5px;
}


.page > .card:nth-child(1) {
  grid-column: 1 / 2;
  grid-row: 1 / 4;
}
.page > .card:nth-child(2) {
  grid-column: 2 / 2;
  grid-row: 1 / 4;
}

.page > .card:nth-child(3) {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
}

.page > .card:nth-child(4) {
  grid-column: 2 / 2;
  grid-row: 2 / 4;
}

.page > .card:nth-child(5) {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

.page > .card:nth-child(6) {
  grid-column: 2 / 2;
  grid-row: 3 / 4;
}

.page > .card:nth-child(7) {
  grid-column: 1 / 2;
  grid-row: 4 / 4;
}

.page > .card:nth-child(8) {
  grid-column: 2 / 2;
  grid-row: 4 / 4;
}



.page-flip > .card:nth-child(1) {
  grid-column: 2 / 2;
  grid-row: 1 / 4;
}
.page-flip > .card:nth-child(2) {
  grid-column: 1 / 2;
  grid-row: 1 / 4;
}

.page-flip > .card:nth-child(3) {
  grid-column: 2 / 2;
  grid-row: 2 / 4;
}

.page-flip > .card:nth-child(4) {
  grid-column: 1 / 2;
  grid-row: 2 / 4;
}

.page-flip > .card:nth-child(5) {
  grid-column: 2 / 2;
  grid-row: 3 / 4;
}

.page-flip > .card:nth-child(6) {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
}

.page-flip > .card:nth-child(7) {
  grid-column: 2 / 2;
  grid-row: 4 / 4;
}

.page-flip > .card:nth-child(8) {
  grid-column: 1 / 2;
  grid-row: 4 / 4;
}


`


const Cards = forwardRef(({ data }, ref) => {


  var chunks = data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 8)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  return [
    <style>{css}</style>,
    chunks.map(chunk => {
      console.log(chunk)
      return [
        <div className="page">
          {chunk.map(c => <div className="card">{c.Question}</div>)}
        </div>,
        <div className="page-flip">
          {chunk.map(c => <div className="card">{c.Answer}</div>)}
        </div>
      ]
    })
  ]
})

export default App;
