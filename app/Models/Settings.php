<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class Settings extends Model
{
    protected $fillable = [
        'app_name',
        'favicon',
        'logo_light',
        'logo_dark',
        'mobile_number',
        'whatsApp_number',
        'email',
        'support_email',
        'notification_email',
        'theme_color',
        'use_dark_mode',
        'facebook_url',
        'twitter_url',
        'instagram_url',
        'youtube_url',
        'linkedin_url',
        'meta_title',
        'meta_description',
        'maintenance_mode',
        'maintenance_message',
        'version',
        'timezone',
        'enable_email_notifications',
        'advertising_acos_target',
        'address',
    ];

    protected $appends = [
        'favicon_url',
        'logo_light_url',
        'logo_dark_url',
    ];

    // Full URL accessors for images
    public function getFaviconUrlAttribute()
    {
        return URL::to($this->favicon);
    }

    public function getLogoLightUrlAttribute()
    {
        return URL::to($this->logo_light);
    }

    public function getLogoDarkUrlAttribute()
    {
        return URL::to($this->logo_dark);
    }

    // Format social media URLs
    public function getFacebookUrlAttribute($value)
    {
        return $this->formatUrl($value);
    }

    public function getTwitterUrlAttribute($value)
    {
        return $this->formatUrl($value);
    }

    public function getInstagramUrlAttribute($value)
    {
        return $this->formatUrl($value);
    }

    public function getYoutubeUrlAttribute($value)
    {
        return $this->formatUrl($value);
    }

    public function getLinkedinUrlAttribute($value)
    {
        return $this->formatUrl($value);
    }

    protected function formatUrl($url)
    {
        if (!$url) return null;

        return Str::startsWith($url, ['http://', 'https://']) ? $url : "https://{$url}";
    }

    // Get singleton settings instance
    public static function getSettings()
    {
        return self::first();
    }
}
