import React from "react";

function Blog() {

    const addPost = async e => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/addPost', {
            subject: subject,
            description: description,
          })
          .then(()=>  {
            history.push("/blog");
          }, (error) => {
            console.log(error);
          });      
        } catch (error) {
          console.error("Error response:");
          console.error(error);
        }
    };

    return (
        <div className="col-md-5">
            <Form onSubmit={addPost}>
                <div className="form-group">
                  <input type="text" className="form-control" id="title" name="title" placeholder="Title" required />
                </div>
               
                <div className="form-group">
                <textarea className="form-control" type="textarea" id="subject" placeholder="Subject" maxlength="140" rows="7"></textarea>
                </div>
                  
              <button type="button" id="submit" name="submit" className="btn btn-primary pull-right">Add Post</button>
            </Form>
        </div>
    );
}

export default Blog;