import React from "react";



function CommentItem() {
    return <div className="comment__item">
        <div className="row">
            <div className="comment__item-avatar">
                <img src="https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png" alt=""/>
            </div>
            <div className="comment__item-content">
                <div className="item-cont">
                    <h5>Gleb Kondratiev</h5>
                    <p>
                        @Larov Dmytro Simple but organized. Really like it. The colors do what they need to do, and it is not overcolored.
                    </p>
                </div>
                <div className="row">
                    <div className="comment__item-content-data">
                        06 Aug 2021
                    </div>
                    <button className="btn comment__item-content-reply">
                        Reply
                    </button>
                </div>

            </div>
        </div>
    </div>
}

export default CommentItem;