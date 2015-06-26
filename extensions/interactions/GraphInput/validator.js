// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Frontend validator for customization args and rules of
 * the interaction.
 */

oppia.filter('oppiaInteractiveGraphInputValidator', [
    'WARNING_TYPES', 'baseInteractionValidationService',
    function(WARNING_TYPES, baseInteractionValidationService) {
  // Returns a list of warnings.
  return function(stateName, customizationArgs, answerGroups, defaultOutcome) {
    var warningsList = [];

    if (!customizationArgs.graph) {
      warningsList.push({
        type: WARNING_TYPES.CRITICAL,
        message: 'a customization argument for the graph should be provided.'
      });
    } else if (customizationArgs.graph.value.vertices.length > 50) {
      warningsList.push({
        type: WARNING_TYPES.CRITICAL,
        message: 'note that only graphs with at most 50 nodes are supported.'
      });
    }

    if (!customizationArgs.canEditEdgeWeight) {
      warningsList.push({
        type: WARNING_TYPES.CRITICAL,
        message: 'a customization argument for \'canEditEdgeWeight\' should ' +
          'be provided.'
      });
    } else if (!customizationArgs.graph.value.isWeighted &&
        customizationArgs.canEditEdgeWeight.value) {
      warningsList.push({
        type: WARNING_TYPES.CRITICAL,
        message: 'the learner cannot edit edge weights for an unweighted graph.'
      });
    }

    if (!customizationArgs.canEditVertexLabel) {
      warningsList.push({
        type: WARNING_TYPES.CRITICAL,
        message: 'a customization argument for \'canEditVertexLabel\' should ' +
          'be provided.'
      });
    } else if (!customizationArgs.graph.value.isLabeled &&
        customizationArgs.canEditVertexLabel.value) {
      warningsList.push({
        type: WARNING_TYPES.CRITICAL,
        message: 'the learner cannot edit vertex labels for an unlabeled graph.'
      });
    }

    warningsList = warningsList.concat(
      baseInteractionValidationService.getAllOutcomeWarnings(
        answerGroups, defaultOutcome, stateName));

    return warningsList;
  };
}]);
