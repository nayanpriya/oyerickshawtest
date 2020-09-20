import React from 'react';
import * as styles from './index.css'
// import Button from './Buttons/Button.js'

export default class EntityDetails extends React.Component {

    handleRowRendering = (user) => {
        console.log(user)
        return (
            <>{
                user.map(item => (
                    <div key={item} className="table-column">
                        {item}
                    </div>
                ))
            }

                < button id="reject" > Reject</button >
            </>

        )
    };

    approveEntity = () => {
        console.log('hehr')
    }

    render() {
        const { userDetails } = this.props
        console.log(userDetails)

        return userDetails && (<div> < button id="approve" onClick={this.approve}> Approve</button>
            {
                userDetails.map((user, index) => {
                    return (
                        <div className="table">
                            <div className="table-row" key={index}>
                                <input type="checkbox" id={index} />
                                {this.handleRowRendering(user)}

                            </div>
                        </div>)
                }
                )
            }
        </div>)
    }


}
