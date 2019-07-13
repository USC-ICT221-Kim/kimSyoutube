import axios from "axios";
import routes from "../../routes";

const commentList = document.querySelector("#jsCommentList");
const comment = document.querySelectorAll(".jsCommnet");

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

const addEvent = () => {
  comment.forEach(function(el) {
    const deleteButton = el.childNodes[1];
    deleteButton.addEventListener("click", handleClick);
  });
};

function init() {
  addEvent();
}

if (comment) {
  init();
}