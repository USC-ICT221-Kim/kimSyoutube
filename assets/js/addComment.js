import axios from "axios";
import routes from "../../routes";


const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");

const delComment = (id, target) => {
    const span = target.parentElement;
    const li = span.parentElement;
    commentList.removeChild(li);
  };
  
  const handleClick = async event => {
    const {target} = event;
    const commentId = target.id;
    const response = await axios({
      url: `${routes.api}/${commentId}/comment/delete`,
      method: "POST",
      data: {
        commentId
      }
    });
    if (response.status === 200) {
      delComment(commentId, target);
    }
  };

const addComment = (comment, commentID) =>{
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    span.innerHTML = comment;
    deleteButton.id = String(commentID);
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", handleClick);
    span.appendChild(deleteButton);
    li.appendChild(span);
    commentList.prepend(li);
}

const sendComment = async comment => {
    const videoId = window.location.href.split("/video/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    });
    if(response.status === 200){
      // eslint-disable-next-line no-underscore-dangle
      addComment(comment, response.data._id);
    }
};

const handleSubmit = event =>{
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input"); 
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
};

function init(){
    addCommentForm.addEventListener("submit", handleSubmit);
}

if(addCommentForm){
    init();
}