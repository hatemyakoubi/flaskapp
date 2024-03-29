import React, { Component } from 'react'
import axios from 'axios';

export default class AddInvoce extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: "",
      responseMsg: {
        status: "",
        message: "",
        result: "",
        error: "",
      },
    };
  }

  // image onchange hander
  handleChange = (e) => {
    const imagesArray = [];

    for (let i = 0; i < e.target.files.length; i++) {
      this.fileValidate(e.target.files[i]);
      imagesArray.push(e.target.files[i]);
    }
    this.setState({
      image: imagesArray,
    });
  };
  // submit handler
  submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let i = 0; i < this.state.image.length; i++) {
      data.append("files[]", this.state.image[i]);
    }
    axios.post("http://127.0.0.1:5000/upload", data)
      .then((response) => {
        console.log(response.data.result)
        if (response.status === 201 || response.status === 200) {
          this.setState({
            responseMsg: {
              status: response.data.status,
              message: response.data.message,
              result: response.data.result
            },
          });
          setTimeout(() => {
            this.setState({
              image: "",
              //responseMsg: "",
            });
          }, 10000);

          document.querySelector("#imageForm").reset();
        }
        alert("Successfully Uploaded");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response)
          if (error.response.status === 401) {
            alert("Invalid credentials");
          }
        }
      });

  };

  // file validation
  fileValidate = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "application/pdf"
    ) {
      this.setState({
        responseMsg: {
          error: "",
        },
      });
      return true;
    } else {
      this.setState({
        responseMsg: {
          error: "File type allowed only pdf,jpg, png, jpeg",
        },
      });
      return false;
    }
  };
  render() {
    return (
      <div className="container py-5">
        <div className="row">
          <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
            <div className="card shadow">

              {this.state.responseMsg.status === "successs" ? (
                <div className="alert alert-success">
                  {this.state.responseMsg.message}
                  {this.state.responseMsg.result}
                </div>
              ) : this.state.responseMsg.status === "failed" ? (
                <div className="alert alert-danger">
                  {this.state.responseMsg.message}
                </div>
              ) : (
                ""
              )}

              <div className="card-body">
                <div className="form-group py-2">
                  <label htmlFor="images">Images</label>
                  <input
                    type="file"
                    name="image"
                    multiple
                    onChange={this.handleChange}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {this.state.responseMsg.error}
                  </span>
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-success">
                  Upload
                </button>
              </div>
            </div>
          </form>
          {this.state.responseMsg.result ? (
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.responseMsg.result.map((item, index) =>
                  <tr key={index} >
                    <td>{item.amount}</td>
                    <td>{item.description}</td>                    
                  </tr>
                  
                )}
              </tbody>

            </table>
          ) : (
            <span> it's not a receipt format</span>
          )}
        </div>
      </div>
    );
  }

};

