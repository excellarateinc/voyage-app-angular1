
class AppController { 
}

const appComponent = {
  template: `
	<div class="wrapper">
	    <ui-view name="header"></ui-view>
		<sidebar-component class="aside"></sidebar-component>	 	
		<section>    
		    <div class="content-wrapper" ui-view name="content" style="margin-top:-5px;"></div>
	    </section>
	    <footer>
	    	<span>&copy; 2016 - Lighthouse Software Solutions, Inc.</span>
	    </footer>	    
	</div>
    `,
  controller: AppController
};

export default appComponent;
