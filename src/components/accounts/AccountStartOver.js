import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import FormButton from '../common/FormButton'

import styled from 'styled-components'

const CustomSegment = styled(Segment)`
   &&& {
      padding: 20px 0 0 0;
      color: #24272a;
      margin-top: 48px;
      line-height: 24px;

      .border {
         border-bottom: 4px solid #f8f8f8 !important;
         padding-bottom: 24px;
      }
      .segment {
         padding-left: 0;
      }
      ul {
         padding-left: 18px;
         margin-top: 0px;
      }
   }
`

const AccountStartOver = ({ handleStartOver, handleResendCode, resendLoader }) => (
   <CustomSegment basic>
      <Segment basic className='border'>
         <span className='font-bold'>Need to fix something? </span>
         <FormButton
            onClick={handleStartOver}
            color='link bold'
         >
            Start over
         </FormButton>
      </Segment>
      <Segment basic>
         <span className='font-bold'>Didn't receive the code?</span> Try this:
         <ul>
            <li>Be sure you entered the account username correctly</li>
            <li>Be sure you entered the correct phone number</li>
            <li>
               Still nothing?&nbsp;
               <FormButton
                  onClick={handleResendCode}
                  color='link bold'
                  sending={resendLoader}
               >
                  Click here to resend the code
               </FormButton>
            </li>
         </ul>
      </Segment>
   </CustomSegment>
)

AccountStartOver.propTypes = {
   handleStartOver: PropTypes.func.isRequired,
   handleResendCode: PropTypes.func.isRequired,
   resendLoader: PropTypes.bool.isRequired
}

export default AccountStartOver
