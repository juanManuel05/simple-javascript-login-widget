import Widget, { configuration, component, journey } from '@forgerock/login-widget';

// Create a configuration instance
const myConfig = configuration();

myConfig.set({
  forgerock: {
    clientId: 'WebOAuthClient',
    redirectUri: window.location.href,
    scope: 'openid profile email address phone',
    serverConfig: {
      baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am/',
      timeout: 5000,
    },
    realmPath: 'alpha',
  },
  links: {
    termsAndConditions: 'https://example.com/terms',
  },
});

// Get the element in your HTML into which you will mount the widget
const widgetRootEl = document.getElementById('widget-root');

// Instantiate Widget with the `new` keyword
// eslint-disable-next-line no-new
new Widget({
  target: widgetRootEl,
});

// Assign the component function
const componentEvents = component();

// Call the open() method, for example after a button click
const loginButton = document.getElementById('loginButton');
const signUpButton = document.getElementById('signUpButton');

// // Assign the journey function
const journeyEvents = journey({
  oauth: false,
  user: false,
});
loginButton.addEventListener('click', async () => {
  componentEvents.open();
  await journeyEvents.start({
    journey: 'Login',
  });
});

signUpButton.addEventListener('click', async () => {
  componentEvents.open();
  await journeyEvents.start({
    journey: 'Registration',
  });
});

journeyEvents.subscribe((event) => {
  // Called multiple times, filtering by event data is recommended
  if (event.journey.successful) {
    // Only output successfull journey log entries
    console.log(event);
  }
});
