import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Styled from 'styled-components'
import { AuthContext } from '../App'
import axios from 'axios'

export default function Home() {
  const { state, dispatch } = useContext(AuthContext)
  const [selectFile, setSelectFile] = useState(null)
  const [verifyResult, setVerifyResult] = useState('')

  if (!state.isLoggedIn) {
    return <Redirect to="/v0/oauth_callback" />
  }

  const { avatar_url, name, public_repos, followers, following } = state.user

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
    })
  }

  const filehandleChange = (event) => {
    setSelectFile(event.target.files[0])
  }

  const upload = () => {
    const data = new FormData()
    if (selectFile) {
      data.append('file', selectFile)
      axios.post('/v0/files/upload', data).then((res) => {
        console.log(res.data)
        localStorage.setItem('id', res.data.id)
        if (res.status === 200) {
          alert('success')
        }
      })
    }
  }

  const verify = () => {
    const id = localStorage.getItem('id')
    if (id) {
      axios.get(`/v0/files/${id}`).then((res) => {
        console.log(res.data)
        if (res.status === 200) setVerifyResult(res.data)
      })
    }
  }

  return (
    <Wrapper>
      <div className="container">
        <button onClick={() => handleLogout()}>Logout</button>
        <div>
          <div className="content">
            <img src={avatar_url} alt="Avatar" />
            <span>{name}</span>
            <span>{public_repos} Repos</span>
            <span>{followers} Followers</span>
            <span>{following} Following</span>
          </div>
          <div className="ctrl-pane">
            <div className="encrypt">
              <div>
                <label>Encrypt</label>
                <input
                  className="file"
                  type="file"
                  name="file"
                  onChange={filehandleChange}
                />
              </div>
              <div className="ctrl-btn">
                <button
                  className="upload-btn"
                  type="button"
                  onClick={() => upload()}
                >
                  upload
                </button>
              </div>
            </div>
            <div className="verify">
              <label>Verify</label>
              <input
                className="address"
                type="text"
                value={verifyResult}
                onChange={(event) => {
                  setVerifyResult(event.target.value)
                }}
              />
              <div className="verify-btn">
                <button onClick={() => verify()}>Verify</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  font-family: Arial;

  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #0041C2;
    cursor: pointer;

    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }

  >div{
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 18px;
    justify-content: flex-start;
    align-items: center;

    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
      width: auto;
  
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
      >span:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
      }
  
      >span:not(:nth-child(2)){
        margin-top: 8px;
        font-size: 14px;
      }
  
    }

    .ctrl-pane {
      .address {
          width: 100%;
          padding: 12px 20px;
          margin: 8px 0;
          box-sizing: border-box;
          border: 3px solid #ccc;
          -webkit-transition: 0.5s;
          transition: 0.5s;
          outline: none;
        }

        .address:focus {
          border: 3px solid #555;
        }

      .encrypt{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 20px 100px;    
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);

        input {
          margin-left: 13px;
        }

        .ctrl-btn {
          display: flex;
          align-items: center;
          margin-left: auto;

          .connect-btn{
            width: 100%;
          }
        }

        button {
          margin: 0;
          margin-left:20px;
        }
      }

      .verify {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px 100px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);

        input {
          margin-left: 30px;
          width: 65%;
        }

        .verify-btn{
          margin-left: auto;
        }

        button {
          margin: 0;
          margin-left: auto;
        }
      }
    }
  }
}
`
