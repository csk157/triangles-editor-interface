var testsContext = require.context('.', true, /(Spec\.js$)|(Helper\.js$)/);
testsContext.keys().forEach(testsContext);
