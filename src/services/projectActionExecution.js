export default class ProjectActionExecution {
  constructor(
    component,
    asyncProjectAction,
    startMessage,
    successMessage,
    failureMessage
  ) {
    this.component = component;
    this.asyncProjectAction = asyncProjectAction;
    this.startMessage = startMessage;
    this.successMessage = successMessage;
    this.failureMessage = failureMessage;
  }

  execute(selectedProjects) {
    this.component.setState({
      actionCompleted: false,
      actionTaken: true,
      actionStatusText: this.startMessage
    });

    let resultPromise = null;

    for (const projectId in selectedProjects) {
      if (!selectedProjects[projectId]) {
        continue;
      }

      if (resultPromise === null) {
        resultPromise = this.asyncProjectAction(projectId).then(result =>
          this.projectActionResultHandler(result)
        );
      } else {
        resultPromise = resultPromise.then(prevUpdateResponse =>
          this.executeNextActionResultHandler(prevUpdateResponse, projectId)
        );
      }
    }

    if (resultPromise != null) {
      resultPromise.then(lastResult => {
        this.projectActionResultHandler(lastResult);

        this.sleepForOneSecond().then(() => {
          this.component.setState({
            actionCompleted: true,
            actionTaken: false,
            actionStatusText:
              lastResult.status === "success"
                ? this.successMessage
                : this.failureMessage
          });
        });
      });
    }
  }

  projectActionResultHandler(result) {
    this.component.setState({ actionStatusText: result.message });
    return result;
  }

  executeNextActionResultHandler(prevResponse, projectId) {
    if (prevResponse.status !== "success") {
      return prevResponse;
    }

    return this.asyncProjectAction(projectId).then(result =>
      this.projectActionResultHandler(result)
    );
  }

  sleepForOneSecond() {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
      return;
    });
  }
}
