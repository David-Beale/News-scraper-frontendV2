import React from 'react';
import Headline from '../headline/headline'
import { CircularProgress } from '@material-ui/core';

export default ({ headlines, deleteHeadline, deleteScraper, isActiveStatus, isActiveStatusScraper }) => {
  return (
    <div className="list__container">
      {!headlines ? 
      (
        (<div className="no-content-container">
            No headlines
          </div>)
      )  :
        headlines.length === 0
          ?
          (<div className="no-content-container">
            <CircularProgress />
          </div>)
          :
          (headlines.map((headline) => {
            return <Headline
              key={headline.id}
              headline={headline}
              deleteHeadline={deleteHeadline}
              deleteScraper={deleteScraper}
              isActiveStatus={isActiveStatus}
              isActiveStatusScraper={isActiveStatusScraper}
            />
          }))
      }
    </div>
  )
}

