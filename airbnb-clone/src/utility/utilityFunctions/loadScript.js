export default (scriptUrl) => {
  //we are defining our own promise to wait for, normally in componentDidMount we use await with axios because axios returns a promise but in our case here we are going to make our own promise because we are not using someone elses API. The way that it works is await says i will not go any farther, meaning no code below this line can run until this callback runs resolve.
  return new Promise((resolve, reject) => {
    //this is just an old school JavaScript way of creating a script tag like we do in the HTML file but we are using JavaScript to do it.
    const script = document.createElement("script");
    script.type = "text/javascript";
    //so here we are setting the src attribute to scriptUrl
    script.src = scriptUrl;
    //we are adding an onload listener to our script and once its finished loading the resolve will run once the resolve runs the await will let go of the lock and stripe will run.
    script.onload = () => {
      console.log("The script has loaded");
      resolve();
    };
    //here we are going to grab the head and the first child cause theres actually only one thing with the tag of head but still grab it. So go out to the head and append it the script which is essentially the same thing as telling JavaScript: <script type="text/javascript" src="https://js.stripe.com/v3"></script>
    //this code will cause the script tag to be dynamically added to the head. the script tag is not part of the site but when this code is run it becomes dynamically part of it.
    //what we need to happen is we need our resolve to run but not until the script tag has been added to the head.
    document.getElementsByTagName("head")[0].appendChild(script);
    console.log("The script has been added to the head");
  });
  //what we need to happen is we need our resolve to run but not until the script tag has been added to the head. the script.onload() function which is an onload listener will prevent stripe from running till the resolve finishes running. once resolve runs the await will let go of the lock and stripe will run.
  console.log("Lets run some stripe");
};
