/*                             Author: Daniel Janitor                               */
/*                             Year: 2021 - June                                    */ 
/*                             Application: EMPLOYEE MANAGEMENT APPLICATION         */
/*                             COMMENT JAVASCRIPT                                   */

class Comment {
    constructor(headline, user, comment) {
        this.headline = headline;
        this.user = user;
        this.comment = comment;
    }
};

//Class Comment Handler
class Cm {
    static displayCategoryList() {
        const users = StoreUser.getUsers();
        users.forEach(user => Cm.addUserToCommentList(user));
    }

    static addUserToCommentList(user) {
        document.querySelector('.comment-input-select-user').innerHTML += `<option value="${user.popName}">${user.popName} ${user.popSurname}</option>`;
    }

    static displayCommentList(){
        const commentsFromLocalStorage = StorageCm.getComment();
        commentsFromLocalStorage.forEach(comment => Cm.addCommentToList(comment));
    }

    static addCommentToList(comment) {
        const commentsMessages = document.querySelector('.comments-messages');
        const commentRow = document.createElement('div');

        commentRow.innerHTML = `
                        <div class="comment-wrapper">
                            <div class="comment-info">
                                <div class="comment-topic">
                                    <div>Topic: <span class="comment-topic-headline">${comment.headline}</span></div>
                                </div>
                                <div class="comment-user">
                                    <div >From User: <span class="comment-user-name">${comment.user}</span></div>
                                </div>
                                <div class="comment-time">
                                    <div>Date: <span class="comment-time-actual"></span></div>
                                </div>
                            </div>
                            <div class="comment-content-wrapper">
                                <div class="comment-text-area-display">${comment.comment}</div>
                                </div>
                            </div>
                        </div>`
        commentsMessages.appendChild(commentRow);
    };

    static commentInputs() {
        const commentHeadline = document.querySelector('.comment-input-headline');
        const commentUser = document.querySelector('.comment-input-select-user');
        const commentText = document.querySelector('.comment-text-area');

        let commentHeadlineV = commentHeadline.value;
        let commentUserV = commentUser.value;
        let commentTextV = commentText.value;

        let comment = new Comment(commentHeadlineV, commentUserV, commentTextV);

        //Add comment to LocalStorage
        StorageCm.addComment(comment)

        //Add comment to list
        Cm.addCommentToList(comment);

        //Reset Input for comment
        Cm.reset();
    }

    static reset() {
        document.querySelector('.comment-input-headline').value = '';
        document.querySelector('.comment-text-area').value = '';
        document.querySelector('.commentUp').classList.remove('commentUpActive');
    };
    static commentNumber() {
        let cmStatistic = StorageCm.getComment();
        console.log(cmStatistic);
        let cmNumber = cmStatistic.length;
        document.querySelector('.totalComments').innerHTML = cmNumber;
    };

}

//Class Comment Storage
class StorageCm {

    static getComment() {
        let commentArray;
        if (localStorage.getItem('comments') === null) {
            commentArray = [];
        }
        else {
            commentArray = JSON.parse(localStorage.getItem('comments'));
        }
        return commentArray;
    };

    static addComment(comment) {
        let commentsArray = StorageCm.getComment();
        commentsArray.push(comment);
        localStorage.setItem('comments', JSON.stringify(commentsArray));
        Cm.commentNumber();
    };

    static addCategory(newCategory) {
        let categoriesArray = StoreCategory.getCategories();
        categoriesArray.push(newCategory);
        localStorage.setItem('categories', JSON.stringify(categoriesArray));
        Ct.commentNumber();
    };
};

//Events
document.querySelector('.btn-create-comment').addEventListener('click', () => {
    document.querySelector('.commentUp').classList.add('commentUpActive');
});
document.querySelector('.comment-btn-close').addEventListener('click', () => {
    Cm.reset();
});
document.querySelector('.popUPComment-cancel').addEventListener('click', () => {
    Cm.reset()
});
document.querySelector('.popUPComment-post').addEventListener('click', Cm.commentInputs);
document.addEventListener('DOMContentLoaded', Cm.displayCategoryList);
document.addEventListener('DOMContentLoaded', Cm.displayCommentList);
document.addEventListener('DOMContentLoaded', Cm.commentNumber);

