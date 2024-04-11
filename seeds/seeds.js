const { BlogPost, Comment, User } = require('../models');

const seedDatabase = async () => {
    try {
        // Seed users
        const users = await User.bulkCreate([
            { username: 'john_doe', email: 'john@example.com', password: 'password123' },
            { username: 'jane_smith', email: 'jane@example.com', password: 'password456' }
        ]);

        // Seed blog posts
        const blogPosts = await BlogPost.bulkCreate([
            { title: 'First Post', content: 'This is the first blog post.', author: users[0].id },
            { title: 'Second Post', content: 'This is the second blog post.', author: users[1].id }
        ]);

        // Seed comments
        const comments = await Comment.bulkCreate([
            { content: 'Great post!', author: users[1].id, postId: blogPosts[0].id },
            { content: 'Nice article!', author: users[0].id, postId: blogPosts[1].id }
        ]);

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

seedDatabase();