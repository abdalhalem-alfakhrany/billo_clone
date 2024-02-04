<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;

class VideoController extends Controller
{
    /**
     * list all videos related to authenticated user.
     */
    public function index()
    {
        /** @var /home/abdalhalem/DEV/billo_clone/backend/app/Models/User.php @instance */
        $user = Auth::user();
        $user->can('viewAny');
        return response()->json(['message' => 'user videos retrieved successfully', 'data' => $user->videos()->toArray()], 200);
    }

    /**
     * store a new video in storage and insert in videos table.
     */
    public function store(StoreVideoRequest $request)
    {
        $video_file = $request->video;

        /** @var /home/abdalhalem/DEV/billo_clone/backend/app/Models/User.php @instance */
        $user = Auth::user();

        // store video in public/uploaded_videos with name of the creator and title provided and uuid
        $file_path = 'uploaded_videos/';
        $file_name = $user->name . '_' . $request['video_title'] . '_' . uuid_create();
        $video_file->move($file_path, $file_name);
        Video::create(['user_id' => $user->id, 'file_path' => $file_path . $file_name, 'title' => $request['video_title']]);

        return response()->json(['message' => 'video uploaded successfully'], 200);
    }

    /**
     * get a specific video with id.
     */
    public function show(string $id)
    {
        return response()->json(['message' => 'video retrieved successfully', 'data' => Video::find($id)->get()->toArray()], 200);
    }

    /**
     * Update the specified video.
     * the updated values is just video title
     */
    public function update(Request $request, string $id)
    {
        $video = Video::find($id);
        if ($request->has('video_title')) {
            $new_video_title = $request['video_title'];
            $video->video_title = $new_video_title;
            $video->save();
            [$user_name, $_video_title, $_uuid] = explode('_', $video->video_file_path);
            $video->video_file_path = $user_name . '_' . $new_video_title . '_' . uuid_create();
        } else {
            return response()->json(['message' => 'please insert new video title'], 400);
        }

        return response()->json(['message' => 'video title updated successfully', 'data' => ['video' => $video->toArray()]], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $video = Video::find($id);
        File::delete('uploaded_videos/' . $video->video_file_path);
        $video->delete();
        return response()->json(['message' => 'video deleted successfully'], 200);
    }
}
