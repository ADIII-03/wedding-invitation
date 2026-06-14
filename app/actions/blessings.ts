"use server";

import clientPromise from '@/lib/mongodb';
import { Blessing } from '../types';

export async function getBlessings(): Promise<Blessing[]> {
  try {
    const client = await clientPromise;
    const db = client.db("wedding");
    const collection = db.collection("blessings");
    
    const data = await collection.find({}).sort({ timestamp: -1 }).toArray();
    
    return data.map(doc => ({
      id: doc._id.toString(),
      name: doc.name,
      relation: doc.relation,
      message: doc.message,
      timestamp: doc.timestamp,
      isCustom: doc.isCustom !== undefined ? doc.isCustom : true
    }));
  } catch (error) {
    console.error("Error fetching blessings from MongoDB:", error);
    return [];
  }
}

export async function addBlessing(blessing: Omit<Blessing, 'id' | 'timestamp' | 'isCustom'>): Promise<{ success: boolean; blessing?: Blessing; error?: string }> {
  try {
    const client = await clientPromise;
    const db = client.db("wedding");
    const collection = db.collection("blessings");

    const newBlessing = {
      name: blessing.name,
      relation: blessing.relation,
      message: blessing.message,
      timestamp: new Date().toISOString(),
      isCustom: true
    };

    const result = await collection.insertOne(newBlessing);

    return {
      success: true,
      blessing: {
        id: result.insertedId.toString(),
        ...newBlessing
      }
    };
  } catch (error) {
    console.error("Error writing blessing to MongoDB:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add blessing to database"
    };
  }
}
