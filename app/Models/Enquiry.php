<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'ip_address',
        'user_agent',
        'page_url',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope for recent enquiries
     */
    public function scopeRecent($query, $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope for enquiries from specific page
     */
    public function scopeFromPage($query, $pageUrl)
    {
        return $query->where('page_url', 'like', "%{$pageUrl}%");
    }

    /**
     * Scope for enquiries with email
     */
    public function scopeWithEmail($query)
    {
        return $query->whereNotNull('email')->where('email', '!=', '');
    }

    /**
     * Scope for enquiries with phone
     */
    public function scopeWithPhone($query)
    {
        return $query->whereNotNull('phone')->where('phone', '!=', '');
    }

    /**
     * Get formatted name attribute
     */
    public function getFormattedNameAttribute()
    {
        return $this->name ?: 'Anonymous';
    }

    /**
     * Get short message attribute
     */
    public function getShortMessageAttribute()
    {
        if (!$this->message) return '';
        return strlen($this->message) > 100 ? substr($this->message, 0, 100) . '...' : $this->message;
    }

    /**
     * Get enquiry source attribute
     */
    public function getSourceAttribute()
    {
        if ($this->page_url) {
            $parsed = parse_url($this->page_url);
            return $parsed['path'] ?? $this->page_url;
        }
        return 'Unknown';
    }

    /**
     * Get country from IP address
     */
    public function getCountryAttribute()
    {
        if (!$this->ip_address || $this->ip_address === '127.0.0.1') {
            return 'Local';
        }
        // In a real application, you might use a service like MaxMind or IP2Location
        return 'Unknown';
    }

    /**
     * Check if enquiry has contact information
     */
    public function hasContactInfo()
    {
        return !empty($this->email) || !empty($this->phone);
    }

    /**
     * Check if enquiry is from today
     */
    public function isFromToday()
    {
        return $this->created_at->isToday();
    }

    /**
     * Check if enquiry is from this week
     */
    public function isFromThisWeek()
    {
        return $this->created_at->isCurrentWeek();
    }

    /**
     * Check if enquiry is from this month
     */
    public function isFromThisMonth()
    {
        return $this->created_at->isCurrentMonth();
    }
}
