<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'title', 'file_path'];

    function user()
    {
        return $this->hasOne(User::class);
    }
}
