(function() {
'use strict';

	angular.module('launchpadApp').component('appComponent', {
		template: `
		<div>
		    <ui-view name="header"></ui-view>
		    <div class="body-content">
		        <ui-view name="content"></ui-view>
		    </div>
		</div>
		`,
		controller: AppController
	});

	function AppController() {}
})();


