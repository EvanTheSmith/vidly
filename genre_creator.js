

async function createCourse() {
    const course = new Course({ // creates an individual course from the class
        name: 'Angular Course',
        category: 'one',
        price: '15.5',
        author: 'Evan',
        tags: ['SQL', 'backend'], // this complex value is only possible in a document/noSQL database like MongoDB
        isPublished: true
    });
    try {
        const result = await course.save(); // save to database asynchronously; use await to wait for result
        console.log(result);
     }
     catch(exception) { // block is executed in event of validation error or any failure in try block
        for (error in exception.errors) {
            console.log(exception.errors[error].message);
        }
     }
}