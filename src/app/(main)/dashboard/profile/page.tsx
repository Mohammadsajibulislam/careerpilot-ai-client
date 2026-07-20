"use client";

import { useState, useEffect, useRef } from "react";
import { IoPersonCircleOutline, IoSaveOutline, IoCloseCircleOutline, IoCloudUploadOutline } from "react-icons/io5";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { fetchProfile, updateProfile } from "@/lib/api/profile";
import { useToast } from "@/hooks/useToast";
import Toast from "@/components/ui/Toast";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

async function uploadResume(file: File): Promise<{ message: string; fileName: string; textLength: number }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${SERVER_URL}/api/upload/resume`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Upload failed");
  }

  return res.json();
}

export default function ProfilePage() {
  const { session, isPending } = useRequireAuth();
  const { toast, showToast, hideToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeText, setResumeText] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        const profile = await fetchProfile();
        setResumeText(profile.resumeText);
        setSkills(profile.skills);
      } catch {
        showToast("Couldn't load your profile", "error");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ resumeText, skills });
      showToast("Profile saved", "success");
    } catch {
      showToast("Failed to save profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadResume(file);
      setResumeFileName(result.fileName);
      showToast("Resume uploaded — text extracted", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (isPending || !session || loading) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className="px-6 py-16 max-w-2xl mx-auto">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <p className="font-mono-label text-xs uppercase" style={{ color: "var(--cp-accent)" }}>
        Your profile
      </p>
      <h1 className="font-display text-3xl font-semibold mt-3 flex items-center gap-3">
        <IoPersonCircleOutline size={28} style={{ color: "var(--cp-accent)" }} />
        Skills & background
      </h1>
      <p className="text-sm mt-2 mb-10" style={{ color: "var(--cp-text-muted)" }}>
        This is what the AI compares roles against for match scoring — the more detail, the better the match.
      </p>

      {/* File upload */}
      <div className="mb-8">
        <label className="font-mono-label text-[11px] uppercase block mb-2" style={{ color: "var(--cp-text-faint)" }}>
          Upload resume (PDF, DOCX, or TXT)
        </label>
        <div
          className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
          style={{ background: "var(--cp-surface)", border: "1px dashed var(--cp-border)" }}
          role="button"
          tabIndex={0}
          aria-label="Upload resume file"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <IoCloudUploadOutline size={24} style={{ color: "var(--cp-accent)" }} />
          <div>
            <p className="text-sm font-medium">
              {uploading ? "Uploading..." : resumeFileName ? resumeFileName : "Click to upload"}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--cp-text-faint)" }}>
              Max 5 MB. Text will be extracted automatically.
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={handleFileUpload}
          className="hidden"
          aria-hidden="true"
        />
      </div>

      <div className="mb-8">
        <label className="font-mono-label text-[11px] uppercase block mb-2" style={{ color: "var(--cp-text-faint)" }}>
          Skills
        </label>
        <div className="flex gap-2 mb-3">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            placeholder="Type a skill and press Enter"
            className="flex-1 rounded-lg py-2.5 px-4 text-sm outline-none"
            style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text)" }}
            aria-label="Add a skill"
          />
          <button
            onClick={addSkill}
            type="button"
            className="px-4 rounded-lg text-sm font-medium"
            style={{ background: "var(--cp-accent-dim)", color: "var(--cp-accent)" }}
            aria-label="Add skill"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2" role="list" aria-label="Your skills">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
              style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text-muted)" }}
              role="listitem"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} type="button" aria-label={`Remove ${skill}`}>
                <IoCloseCircleOutline size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <label className="font-mono-label text-[11px] uppercase block mb-2" style={{ color: "var(--cp-text-faint)" }}>
          Resume summary / experience
        </label>
        <textarea
          rows={10}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste a summary of your experience, projects, and background here..."
          className="w-full rounded-lg py-3 px-4 text-sm outline-none resize-none"
          style={{ background: "var(--cp-surface)", border: "1px solid var(--cp-border)", color: "var(--cp-text)" }}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium disabled:opacity-50"
        style={{ background: "var(--cp-accent)", color: "var(--cp-bg)" }}
      >
        <IoSaveOutline size={16} />
        {saving ? "Saving..." : "Save profile"}
      </button>
    </div>
  );
}
