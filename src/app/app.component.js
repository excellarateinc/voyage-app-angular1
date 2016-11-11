(function() {
	'use strict';

	// TODO: Move to a view
	angular
		.module('launchpadApp')
		.component('app', {
			template: `
			<div>
			    <ui-view name="header"></ui-view>
			    <div class="body-content">
			        <ui-view name="content"></ui-view>
			    </div>
			</div>
			`,
			controller: appController
		});

	function appController() {}
})();


