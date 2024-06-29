require('dotenv').config()
const { BulkMQ } = require('bulkmq');
const generateMailReply = require('./generateMailReply')


const mq = new BulkMQ({
    backend: 'redis',
    redis: {
        host: 'localhost',
        port: 6379,
    }
});


async function processGmailTasks() {
    try {
        await mq.receive('gmail_tasks_queue', async (task) => {
            const { email, password, host } = task;
            try {
                await generateMailReply(email, password, host);
                console.log('Gmail task completed successfully:', email, host);
            } catch (error) {
                console.error('Failed to process Gmail task:', error);
            }
        });
    } catch (error) {
        console.error('Failed to start Gmail task processing:', error);
    }
}


async function processOutlookTasks() {
    try {
        await mq.receive('outlook_tasks_queue', async (task) => {
            const { email, password, host } = task;
            try {
                await generateMailReply(email, password, host);
                console.log('Outlook task completed successfully:', email, host);
            } catch (error) {
                console.error('Failed to process Outlook task:', error);
            }
        });
    } catch (error) {
        console.error('Failed to start Outlook task processing:', error);
    }
}

// Start processing Outlook tasks
processOutlookTasks();


// Start processing Gmail tasks
processGmailTasks();




