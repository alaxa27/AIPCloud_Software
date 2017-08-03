import request from 'superagent'

const DataService = store => next => action => {
  /*
  Pass all actions through by default
  */
  next(action)
  switch (action.type) {
  case 'GET_INIT':
    /*
    In case we receive an action to send an API request, send the appropriate request
    */
    request
      .get('35.189.98.76/init')
      .end((err, res) => {
        if (err) {
          /*
          in case there is any error, dispatch an action containing the error
          */
          return next({
            type: 'GET_INIT_ERROR',
            err
          })
        }
        const data = res
        console.log(data);
        /*
        Once data is received, dispatch an action telling the application
        that data was received successfully, along with the parsed data
        */
        next({
          type: 'GET_INIT_RECEIVED',
          data
        })
      })
    break
  /*
  Do nothing if the action does not interest us
  */
  default:
    break
  }

};

export default DataService
