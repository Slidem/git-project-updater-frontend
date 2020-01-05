import React, { Component } from "react";
import ActionStepHeader from "./actionStepHeader";

class ActionMenu extends Component {
  definedSteps = {
    selectProjects: this.projectStepDefinition(
      "selectProjects",
      "Select Projects"
    ),
    updateProjectsSources: this.projectStepDefinition(
      "updateProjectsSources",
      "Update Project Sources"
    ),
    buildProjectSources: this.projectStepDefinition(
      "buildProjectSources",
      "Build Projects"
    )
  };

  definedStepsOrder = [
    "selectProjects",
    "updateProjectsSources",
    "buildProjectSources"
  ];

  state = {
    stepsTakenStack: [{ ...this.definedSteps.selectProjects }]
  };

  render() {
    return <React.Fragment>{this.renderTakenSteps()}</React.Fragment>;
  }

  renderTakenSteps() {
    const renderdSteps = [];
    for (const s of this.state.stepsTakenStack) {
      renderdSteps.push(
        <ActionStepHeader
          {...s}
          onStepExit={() => this.removeStep()}
          onStepExecuted={code => this.stepExecuted(code)}
        />
      );
    }
    return renderdSteps;
  }

  stepExecuted(code) {
    const nextDefinedStepIdx = this.definedStepsOrder.indexOf(code) + 1;
    if (
      nextDefinedStepIdx >= 0 &&
      nextDefinedStepIdx < this.definedStepsOrder.length
    ) {
      this.addStep(this.definedStepsOrder[nextDefinedStepIdx]);
    }
  }

  addStep(code) {
    const stepsTakenSoFar = this.state.stepsTakenStack;
    stepsTakenSoFar.forEach(s => (s.stepDisabled = true));

    const stepToAdd = { ...this.definedSteps[code] };

    console.log(stepToAdd);
    stepToAdd.stepDisabled = false;
    // stepToAdd.nextDisabled = false;

    this.setState({ stepsTakenStack: [...stepsTakenSoFar, stepToAdd] });
  }

  removeStep() {
    if (this.state.stepsTakenStack.length === 1) {
      this.props.actionMenuExited();
      return;
    }

    const removedSteps = [...this.state.stepsTakenStack];
    removedSteps.pop();
    const prevStep = removedSteps[removedSteps.length - 1];
    prevStep.stepDisabled = false;
    //prevStep.nextDisabled = true;
    this.setState({ stepsTakenStack: removedSteps });
  }

  projectStepDefinition(code, label) {
    return {
      stepCode: code,
      stepLabel: label,
      stepDisabled: false,
      nextDisabled: false
    };
  }
}

export default ActionMenu;
