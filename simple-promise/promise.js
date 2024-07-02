class PromiseSimple {
  constructor(executionFunction) {
    this.promiseChain = [];
    this.handleError = () => {};

    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    executionFunction(this.onResolve, this.onReject);
  }

  then(handleSuccess) {
    this.promiseChain.push(handleSuccess);
    return this;
  }

  catch(handleError) {
    this.handleError = handleError;
    return this;
  }

  onResolve(value) {
    let storedValue = value;

    try {
      this.promiseChain.forEach((nextFunction) => {
        storedValue = nextFunction(storedValue);
      });
    } catch (error) {
      this.promiseChain = [];
      this.onReject(error);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}

fakeApiBackend = () => {
  const user = {
    username: 'fakeusername',
    favoriteNumber: '41',
    profile: 'https://yiorgos-portfolio.vercel.app/',
  };

  // Randomizer to simulate the probability of encountering an error
  if (Math.random() > 0.05) {
    return {
      data: user,
      statusCode: 200,
    }
  } else {
    const error = {
      statusCode: 404,
      message: 'Could not find user',
      error: 'Not found',
    }

    return error;
  }
}

const makeApiCall = () => {
  return new PromiseSimple((resolve, reject) => {
    // Timeout simulates the network delay. The promise awaits for the response
    // and once received it executes the `then` blocks in order.
    setTimeout(() => {
      const apiResponse = fakeApiBackend();

      if (apiResponse.statusCode >= 400) {
        reject(apiResponse);
      } else {
        resolve(apiResponse.data);
      }
    }, 5000);
  });
}

makeApiCall()
  .then((user) => {
    console.log('In the first .then()');
    return user;
  })
  .then((user) => {
    console.log(`User ${user.username}'s favorite number is ${user.favoriteNumber}'`);
    return user;
  })
  .then((user) => {
    console.log('The previous .then() logged the favoriteNumber');
    return user.profile;
  })
  .then((profile) => {
    console.log(`The profile URL is ${profile}`);
  })
  .then(() => {
    console.log('This is the last then()');
  })
  .catch((error) => {
    console.log(error.message);
  });
