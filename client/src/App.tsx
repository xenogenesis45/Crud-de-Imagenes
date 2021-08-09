import React, { Fragment, ChangeEvent, useState, useEffect } from 'react';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

function App() {

  const [fileArch, setFileArch] = useState(null)

  const [imageList, setimageList] = useState([])

  const [listUpdate, setlistUpdate] = useState(false)

  const selectHandler = async (e: InputChange) => {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file: any = input.files[0];
    console.log(file);

    setFileArch(file)
    console.log(file)
  }

  const sendHandler = async () => {
    if (!fileArch) {
      alert('debes cargar un archivo')
      return
    }
    const formData: any = new FormData();
    // const document: any = new Document();

    formData.append('images', fileArch)

    fetch('http://localhost:5000/images/post', {
      method: 'POST',
      body: formData
    })
      .then(res => res.text())
      .then(res => {
        setlistUpdate(true)
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })

    // document.getElementById('fileInput').value = ''
    // setFileArch(null)
  }

  useEffect(() => {
    fetch('http://localhost:5000/images/get')
      .then(res => res.json())
      .then(res => setimageList(res))
      .catch(err => {
        console.error(err)
      })
    setlistUpdate(false)
  }, [listUpdate])


  return (
    <Fragment>
      {/* navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className=' navbar-brand' href='#' >Image app</a>
        </div>
      </nav>
      {/* container */}
      <div className='container mt-5'>
        <div className='card p-3'>
          <div className='row'>
            <div className='col-10'>
              <input id='fileInput' type="file" className='form-control' onChange={selectHandler} />
            </div>
            <div className='col-2'>
              <button className='btn btn-primary col-12' onClick={sendHandler}>Subir</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mt-3' style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imageList.map((image: any) => (
          <div key={image} className='card m-2' >
            <img src={'http://localhost:5000/' + image} alt="..." className='img-card-top' style={{ height: '200px', width: '300px' }} />
            <div className='card-body' style={{ textAlign: 'center' }}>
              <button className='btn btn-dark'>Click para ver</button>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default App;
