import mongoose from "mongoose";

async function runTransaction(transaction) {
    let result
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        result = await transaction();
        await session.commitTransaction();
        console.info("Transaction committed successfully.");
    } catch (error) {
        console.error("Transaction failed:", error);
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
    return result;
}

export default runTransaction;