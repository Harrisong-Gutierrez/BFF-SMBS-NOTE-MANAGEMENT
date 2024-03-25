
import { createClient } from "@/utils/supabase/client";
import { NextResponse, NextRequest } from "next/server";

const supabase = createClient();

export const GET = async () => {
    let { data: Notes, error } = await supabase.from("notes").select("*");
    if (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json(
            { message: "Failed to fetch notes", error: error.message },
            { status: 500 }
        );
    }
    return NextResponse.json(
        { message: "Notes fetched successfully", notes: Notes },
        { status: 200 }
    );
};


export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { user_id, note_text } = await request.json();
        const { data: note, error } = await supabase.from("notes").insert([{ user_id, note_text }]);
        if (error) {
            console.error("Error adding note:", error.message);
            return NextResponse.json(
                { message: "Failed to add note", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Note added successfully", note },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error adding note:", error.message);
        return NextResponse.json(
            { message: "Failed to add note", error: error.message },
            { status: 500 }
        );
    }
};

export const PUT = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id, user_id, note_text } = await request.json();
        const { data: note, error } = await supabase.from("notes").update({ user_id, note_text }).eq('id', id);
        if (error) {
            console.error("Error updating note:", error.message);
            return NextResponse.json(
                { message: "Failed to update note", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Note updated successfully", note },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating note:", error.message);
        return NextResponse.json(
            { message: "Failed to update note", error: error.message },
            { status: 500 }
        );
    }
};

export const DELETE = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const { id } = await request.json();
        const { error } = await supabase.from("notes").delete().eq('id', id);
        if (error) {
            console.error("Error deleting note:", error.message);
            return NextResponse.json(
                { message: "Failed to delete note", error: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: "Note deleted successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error deleting note:", error.message);
        return NextResponse.json(
            { message: "Failed to delete note", error: error.message },
            { status: 500 }
        );
    }
};




