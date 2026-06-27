import { supabase } from '@/lib/supabase';

export interface EncouragementCard {
  id: string;
  content: string;
  category: string;
  author: string;
}

export interface WellnessNotification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'nudge' | 'alert';
  timestamp: string;
}

const AFFIRMATIONS = [
  "You are doing enough, even when the world asks for more. #Harmony Hub",
  "Your worth is not defined by your 'black tax' or family expectations. You matter.",
  "Mirembe. Peace starts with how you talk to yourself today.",
  "Small steps lead to big change. Keep pushing, you've got this.",
  "It's okay to prioritize your mental health. You can't pour from an empty cup.",
  "You are resilient, like the mountains of Uganda. Unshakable.",
  "Webale for showing up today. That in itself is a victory.",
  "Your dreams are valid, regardless of the economy or job market.",
  "Identity is a journey, not a destination. You are allowed to grow.",
  "Brave is not the absence of fear, but moving forward despite it.",
  "You are the architect of your own joy. Build something beautiful today.",
  "Loneliness is temporary; your inner strength is forever.",
  "You are seen. You are heard. You are supported. #SanyuAI",
  "Rest is not a reward; it is a necessity. Give yourself permission to pause.",
  "Comparison is the thief of joy. Your path is unique and beautiful.",
  "You are capable of handling whatever this week throws at you.",
  "Your voice has power. Speak your truth with kindness and courage.",
  "Progress over perfection. Every small win counts.",
  "You are a light in your community. Let yourself shine.",
  "Osiibye otya? Regardless of how your day was, tomorrow is a new beginning."
];

export async function getDailyAffirmation(): Promise<string> {
  try {
    const { data: dbAffirmations } = await supabase
      .from('wellness_resources')
      .select('content')
      .eq('type', 'affirmation')
      .limit(20);

    if (dbAffirmations && dbAffirmations.length > 0) {
      const today = new Date();
      const index = (today.getFullYear() * 365 + (today.getMonth() + 1) * 31 + today.getDate()) % dbAffirmations.length;
      const content = (dbAffirmations as any)[index].content;
      return content.text || content.message || AFFIRMATIONS[0];
    }
  } catch (error) {
    console.error('Error fetching affirmations from DB:', error);
  }

  const today = new Date();
  // Simple deterministic random based on date
  const index = (today.getFullYear() * 365 + (today.getMonth() + 1) * 31 + today.getDate()) % AFFIRMATIONS.length;
  return AFFIRMATIONS[index];
}

// ... (removed duplicate getPersonalizedEncouragement)

export async function getMoodTrends(userId: string) {
  try {
    const { data, error } = await supabase
      .from('mood_logs')
      .select('mood, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(30);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching mood trends:', error);
    return [];
  }
}

export async function getWellnessNotifications(userId: string): Promise<WellnessNotification[]> {
  const notifications: WellnessNotification[] = [];
  const now = new Date();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  try {
    // 1. Check for mood log reminder (if not logged today)
    const { data: moodLoggedToday, error: moodError } = await supabase
      .from('mood_logs')
      .select('id')
      .eq('user_id', userId)
      .gte('created_at', todayStart.toISOString())
      .limit(1);

    if (!moodLoggedToday || moodLoggedToday.length === 0) {
      notifications.push({
        id: 'mood-check-in-' + todayStart.getTime(),
        title: 'Daily Check-in',
        message: "How are you feeling today? Take a moment to log your mood and reflect.",
        type: 'reminder',
        timestamp: new Date().toISOString()
      });
    }

    // 2. Check for journal entry reminder (if not written in last 3 days)
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const { data: recentJournal } = await supabase
      .from('journals')
      .select('id')
      .eq('user_id', userId)
      .gte('created_at', threeDaysAgo.toISOString())
      .limit(1);

    if (!recentJournal || recentJournal.length === 0) {
      notifications.push({
        id: 'journal-nudge',
        title: 'Safe Space to Write',
        message: "It's been a few days since your last reflection. Your journal is a safe space for your thoughts.",
        type: 'nudge',
        timestamp: new Date().toISOString()
      });
    }
    
    // 3. Motivational nudge for Monday
    if (new Date().getDay() === 1) { // Monday
       notifications.push({
        id: 'weekly-nudge',
        title: 'New Week, New Start',
        message: "It's a fresh week. Set a small goal for your mental well-being today.",
        type: 'nudge',
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error generating wellness notifications:', error);
  }

  return notifications;
}

export async function getActivityMetrics(userId: string) {
  try {
    const { count: moodCount } = await supabase
      .from('mood_logs')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const { count: journalCount } = await supabase
      .from('journals')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    const { count: communityCount } = await supabase
      .from('community_posts')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId);

    return {
      moodLogs: moodCount || 0,
      journals: journalCount || 0,
      communityPosts: communityCount || 0,
    };
  } catch (error) {
    console.error('Error fetching activity metrics:', error);
    return { moodLogs: 0, journals: 0, communityPosts: 0 };
  }
}

export async function generateAIAffirmation(mood?: string): Promise<string> {
  try {
    const response = await fetch('/api/affirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mood }),
    });

    if (!response.ok) {
      throw new Error('Affirmation generation failed');
    }

    const data = await response.json();
    return data.affirmation;
  } catch (error) {
    console.error('Error in generateAIAffirmation:', error);
    // Fallback to static affirmations
    const AFFIRMATIONS = [
      "You are doing enough, even when the world asks for more.",
      "Your worth is not defined by family expectations. You matter.",
      "Peace starts with how you talk to yourself today.",
      "Small steps lead to big change. Keep pushing."
    ];
    return AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  }
}

export async function getPersonalizedEncouragement(userId: string): Promise<string> {
  try {
    // Fetch user's latest mood to personalize the encouragement
    const { data: latestMood } = await supabase
      .from('mood_logs')
      .select('mood')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    return await generateAIAffirmation((latestMood as any)?.mood);
  } catch (error) {
    console.error('Error in getPersonalizedEncouragement:', error);
    return "You're not alone on this journey. We're here with you.";
  }
}
