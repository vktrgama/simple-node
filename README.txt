My first approach was to get the API working, calling it with hardcoded values to get a response. I started in a separate file for the service, once I have API working I start formating the data result into the final result set, and start replacing placeholders for the parameters from the input array, all mocked in service until I started making changes to the solutions file.

Solution file was my last step, formating and sorting the final result, and adding input validations, it crossed my mind to add some sort of a prompt to wait for service promise response in the solution file, but had some issues with the 'readline' library, and did not want to waste more time, so I decided to scratch that, and just move the handling of the service promise to the solutions file, I wanted the service to be fully isolated, so it can be tested independently.

I enjoy this test and if API permits we could add some data pagination, list seem to be too long initially, and also add some cosmetic output adding a library like 'console.table' which present data in columns.

Thanks
