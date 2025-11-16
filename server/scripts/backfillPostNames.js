import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import PostMessage from '../models/postMessage.js';
import User from '../models/user.js';

const run = async () => {
    await connectDB();
    try {
        const posts = await PostMessage.find({ $or: [{ name: { $exists: false } }, { name: '' }, { name: null }] });
        console.log(`Found ${posts.length} posts without a name`);
        let updated = 0;
        for (const post of posts) {
            if (post.creator) {
                const user = await User.findById(post.creator).select('name');
                const name = user?.name || 'Anonymous';
                post.name = name;
                await post.save();
                updated++;
                console.log(`Updated post ${post._id} -> name: ${name}`);
            } else {
                post.name = 'Anonymous';
                await post.save();
                updated++;
                console.log(`Updated post ${post._id} -> name: Anonymous (no creator)`);
            }
        }
        console.log(`Migration complete. Updated ${updated} posts.`);
    } catch (err) {
        console.error('Migration error:', err);
    } finally {
        process.exit(0);
    }
};

run();
