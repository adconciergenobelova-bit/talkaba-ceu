'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  UploadCloud,
  CheckCircle2,
  Trash2,
  Edit3,
  Calendar,
  Lock,
  Plus,
  ArrowLeft,
  Eye,
  FileImage,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Key,
  AlertCircle,
  LogOut,
} from 'lucide-react';
import type { CEUEvent } from '@/lib/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Change Password State
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [passChangeStatus, setPassChangeStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [events, setEvents] = useState<CEUEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    month: 'January',
    year: 2027,
    episode: 3,
    status: 'upcoming' as 'upcoming' | 'past' | 'live',
    title: '',
    presenterName: '',
    presenterCredentials: '',
    presenterTitle: '',
    presenterOrg: '',
    presenterBio: '',
    date: 'Wednesday, 20 January 2027',
    time: '7:00 PM',
    timezone: 'Nigerian Time (WAT)',
    platform: 'Via Zoom',
    zoomLink: 'https://tinyurl.com/JoinCEUEvent',
    zoomPasscode: 'TalkABA',
    registrationLink: 'https://tinyurl.com/talkABAregForm',
    nigeriaPrice: '₦3,500 per unit',
    internationalPrice: '$5 per unit',
    posterUrl: '',
    highlights: 'Expert Insights, Practical Strategies, Professional Development, Real-World Applications',
  });

  // Selected file for upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Verify Auth on Load
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch('/api/auth/verify');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadEvents();
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    }
    verifyAuth();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEvents(data.events);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword('');
        loadEvents();
      } else {
        setAuthError(data.error || 'Access Denied: Invalid credentials.');
      }
    } catch (err) {
      setAuthError('Authentication request failed. Please check network.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      // ignore
    }
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassChangeStatus(null);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: currentPassInput,
          newPassword: newPassInput,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPassChangeStatus({ type: 'success', text: data.message });
        setCurrentPassInput('');
        setNewPassInput('');
        setTimeout(() => setShowPasswordChange(false), 3000);
      } else {
        setPassChangeStatus({ type: 'error', text: data.error || 'Failed to update password' });
      }
    } catch (err) {
      setPassChangeStatus({ type: 'error', text: 'Error contacting server' });
    }
  };

  // Handle Poster File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Upload Poster via API
  const handleUploadPoster = async () => {
    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }

    setUploadingPoster(true);
    try {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append(
        'customName',
        `${formData.month.toLowerCase()}-${formData.year}-poster`
      );

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, posterUrl: result.filePath }));
        setStatusMessage({
          type: 'success',
          text: `Poster uploaded successfully! Saved to ${result.filePath}`,
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: result.error || 'Upload failed',
        });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Poster upload failed' });
    } finally {
      setUploadingPoster(false);
    }
  };

  // Save / Update Event
  const handleSubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const eventPayload = {
        id: editingId || `${formData.month.toLowerCase()}-${formData.year}`,
        month: formData.month,
        year: Number(formData.year),
        episode: Number(formData.episode),
        status: formData.status,
        title: formData.title,
        presenter: {
          name: formData.presenterName,
          credentials: formData.presenterCredentials,
          title: formData.presenterTitle,
          organization: formData.presenterOrg,
          bio: formData.presenterBio,
        },
        date: formData.date,
        time: formData.time,
        timezone: formData.timezone,
        platform: formData.platform,
        zoomLink: formData.zoomLink,
        zoomPasscode: formData.zoomPasscode,
        registrationLink: formData.registrationLink,
        certification: {
          isPaid: true,
          nigeriaPrice: formData.nigeriaPrice,
          internationalPrice: formData.internationalPrice,
        },
        highlights: formData.highlights
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        poster: formData.posterUrl || (previewUrl ? formData.posterUrl : ''),
      };

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      });

      const resData = await res.json();
      if (resData.success) {
        setStatusMessage({
          type: 'success',
          text: editingId ? 'Episode updated successfully!' : 'New monthly episode created successfully!',
        });
        setEditingId(null);
        resetForm();
        loadEvents();
      } else {
        setStatusMessage({ type: 'error', text: resData.error || 'Failed to save event' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Error submitting event' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (ev: CEUEvent) => {
    setEditingId(ev.id);
    setFormData({
      month: ev.month,
      year: ev.year,
      episode: ev.episode,
      status: ev.status,
      title: ev.title,
      presenterName: ev.presenter.name,
      presenterCredentials: ev.presenter.credentials,
      presenterTitle: ev.presenter.title,
      presenterOrg: ev.presenter.organization || '',
      presenterBio: ev.presenter.bio || '',
      date: ev.date,
      time: ev.time,
      timezone: ev.timezone,
      platform: ev.platform,
      zoomLink: ev.zoomLink || 'https://tinyurl.com/JoinCEUEvent',
      zoomPasscode: ev.zoomPasscode || 'TalkABA',
      registrationLink: ev.registrationLink || 'https://tinyurl.com/talkABAregForm',
      nigeriaPrice: ev.certification.nigeriaPrice,
      internationalPrice: ev.certification.internationalPrice,
      posterUrl: ev.poster || '',
      highlights: ev.highlights?.join(', ') || '',
    });
    setPreviewUrl(ev.poster || null);
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this episode?')) return;
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ type: 'success', text: 'Episode deleted.' });
        loadEvents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (ev: CEUEvent) => {
    const nextStatus = ev.status === 'upcoming' ? 'past' : 'upcoming';
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ev, status: nextStatus }),
      });
      if (res.ok) loadEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData({
      month: 'January',
      year: 2027,
      episode: events.length + 1,
      status: 'upcoming',
      title: '',
      presenterName: '',
      presenterCredentials: '',
      presenterTitle: '',
      presenterOrg: '',
      presenterBio: '',
      date: 'Wednesday, 20 January 2027',
      time: '7:00 PM',
      timezone: 'Nigerian Time (WAT)',
      platform: 'Via Zoom',
      zoomLink: 'https://tinyurl.com/JoinCEUEvent',
      zoomPasscode: 'TalkABA',
      registrationLink: 'https://tinyurl.com/talkABAregForm',
      nigeriaPrice: '₦3,500 per unit',
      internationalPrice: '$5 per unit',
      posterUrl: '',
      highlights: 'Expert Insights, Practical Strategies, Professional Development, Real-World Applications',
    });
  };

  // Loading spinner during initial auth check
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <RefreshCw size={20} className="animate-spin text-teal-400" />
          <span>Verifying security credentials...</span>
        </div>
      </div>
    );
  }

  // LOCKED STATE: STRICT ACCESS CONTROL
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top lock emblem */}
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 text-teal-400 mx-auto flex items-center justify-center mb-6 border border-teal-500/20 shadow-inner">
            <Lock size={30} className="text-teal-400" />
          </div>

          <div className="text-center mb-6">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-[11px] font-bold uppercase tracking-wider border border-rose-500/20">
              Restricted Area
            </span>
            <h2 className="text-2xl font-black text-white mt-3 mb-1.5">
              TalkABA Organizer Portal
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
              This administrative portal is strictly protected. Please enter your confidential password to unlock.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-mono"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-semibold">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw size={15} className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Lock size={15} />
                  <span>Unlock Admin Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED STATE: ORGANIZER DASHBOARD
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-24">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Return to website"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-base">TalkABA Organizer Portal</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase flex items-center gap-1">
                  <ShieldCheck size={11} /> Authorized
                </span>
              </div>
              <span className="text-xs text-slate-500">Monthly CEU Schedule &amp; Poster Upload System</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
            >
              <Key size={14} className="text-teal-600" />
              <span>Change Password</span>
            </button>

            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <Eye size={14} />
              <span>Preview Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold text-white hover:bg-rose-900 transition-colors flex items-center gap-1.5"
            >
              <LogOut size={13} />
              <span>Lock / Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Change Password Modal / Card */}
        {showPasswordChange && (
          <div className="mb-6 p-6 rounded-3xl bg-white border border-teal-200 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Key size={18} className="text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Change Admin Password</h3>
              </div>
              <button
                onClick={() => setShowPasswordChange(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="grid sm:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  New Password (min 6 chars)
                </label>
                <input
                  type="password"
                  required
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Save New Password
                </button>
              </div>
            </form>

            {passChangeStatus && (
              <p
                className={`text-xs font-semibold mt-3 ${
                  passChangeStatus.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {passChangeStatus.text}
              </p>
            )}
          </div>
        )}

        {/* Status notification */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl mb-6 flex items-center justify-between shadow-sm ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 size={18} />
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs font-bold uppercase opacity-60 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form to Upload Poster & Create/Edit Episode */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  {editingId ? 'Edit Monthly Episode' : 'Upload Monthly Poster & Schedule'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publish each month&apos;s CEU flyer and session syllabus directly to the live website.
                </p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmitEvent} className="space-y-6">
              {/* SECTION 1: POSTER UPLOAD */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Official Monthly Poster Flyer
                </label>
                <div className="grid sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-xs text-slate-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-700 file:text-white hover:file:bg-teal-800 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400 mt-2">
                      Upload high-resolution poster (JPG, PNG, or WebP).
                    </p>

                    {selectedFile && (
                      <button
                        type="button"
                        onClick={handleUploadPoster}
                        disabled={uploadingPoster}
                        className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <UploadCloud size={14} />
                        <span>{uploadingPoster ? 'Uploading...' : 'Confirm Poster Upload'}</span>
                      </button>
                    )}
                  </div>

                  {/* Poster Preview */}
                  <div className="flex justify-center">
                    {previewUrl || formData.posterUrl ? (
                      <div className="relative w-28 h-36 rounded-xl overflow-hidden border border-slate-300 shadow-sm">
                        <Image
                          src={previewUrl || formData.posterUrl}
                          alt="Poster preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-36 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-2 text-center text-[10px]">
                        <FileImage size={24} className="mb-1" />
                        <span>Poster preview will appear here</span>
                      </div>
                    )}
                  </div>
                </div>

                {formData.posterUrl && (
                  <p className="text-[11px] text-teal-800 font-mono mt-2 truncate">
                    ✓ Poster Path: {formData.posterUrl}
                  </p>
                )}
              </div>

              {/* SECTION 2: EPISODE TIMING & STATUS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Month *
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    {[
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December',
                    ].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Episode #
                  </label>
                  <input
                    type="number"
                    value={formData.episode}
                    onChange={(e) => setFormData({ ...formData, episode: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Completed (Past)</option>
                    <option value="live">🔴 Live Now</option>
                  </select>
                </div>
              </div>

              {/* SECTION 3: TOPIC TITLE */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Featured Presentation Topic / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ed.'s Model for Behavior Analysis and Intervention"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* SECTION 4: SPEAKER DETAILS */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Presenter Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr Edward Usifo Asikhia"
                    value={formData.presenterName}
                    onChange={(e) => setFormData({ ...formData, presenterName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Credentials
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BCBA-D"
                    value={formData.presenterCredentials}
                    onChange={(e) => setFormData({ ...formData, presenterCredentials: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Presenter Role / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Renowned Behavior Analyst"
                    value={formData.presenterTitle}
                    onChange={(e) => setFormData({ ...formData, presenterTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Doctoral-Level Board Certified Behavior Analyst"
                    value={formData.presenterOrg}
                    onChange={(e) => setFormData({ ...formData, presenterOrg: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Presenter Bio &amp; Profile Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Distinguished background, contributions to Applied Behavior Analysis..."
                  value={formData.presenterBio}
                  onChange={(e) => setFormData({ ...formData, presenterBio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              {/* SECTION 5: SCHEDULE & ZOOM DETAILS */}
              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Event Date Text
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Time &amp; Timezone
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Zoom Passcode
                  </label>
                  <input
                    type="text"
                    value={formData.zoomPasscode}
                    onChange={(e) => setFormData({ ...formData, zoomPasscode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Zoom Meeting Link
                  </label>
                  <input
                    type="text"
                    value={formData.zoomLink}
                    onChange={(e) => setFormData({ ...formData, zoomLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Registration Link
                  </label>
                  <input
                    type="text"
                    value={formData.registrationLink}
                    onChange={(e) => setFormData({ ...formData, registrationLink: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              {/* SECTION 6: PRICING */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Nigeria CEU Cert Price
                  </label>
                  <input
                    type="text"
                    value={formData.nigeriaPrice}
                    onChange={(e) => setFormData({ ...formData, nigeriaPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    International CEU Cert Price
                  </label>
                  <input
                    type="text"
                    value={formData.internationalPrice}
                    onChange={(e) => setFormData({ ...formData, internationalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  <span>{editingId ? 'Update Episode' : 'Publish Monthly Episode to Website'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Manage All Episodes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-black text-slate-900 text-base">Current Monthly Episodes</h3>
                  <span className="text-xs text-slate-400">Total: {events.length} episodes</span>
                </div>
                <button
                  onClick={loadEvents}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                  title="Refresh list"
                >
                  <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                </button>
              </div>

              <div className="space-y-3">
                {events.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              ev.status === 'upcoming'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {ev.status}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500">
                            {ev.month} {ev.year}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                          {ev.title}
                        </h4>
                        <p className="text-[11px] text-teal-800 font-semibold">
                          {ev.presenter.name} ({ev.presenter.credentials})
                        </p>
                      </div>

                      {ev.poster && (
                        <div className="relative w-10 h-14 rounded-md overflow-hidden shrink-0 border border-slate-300">
                          <Image src={ev.poster} alt="Poster" fill className="object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <button
                        onClick={() => toggleStatus(ev)}
                        className="text-[11px] font-semibold text-slate-600 hover:text-teal-800 transition-colors"
                      >
                        {ev.status === 'upcoming' ? 'Mark Completed' : 'Mark Upcoming'}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(ev)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-slate-200 transition-colors"
                          title="Edit"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(ev.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
