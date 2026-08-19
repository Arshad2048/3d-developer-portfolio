/**
 * Arshad Khan — Interactive Developer Portfolio Application
 * Manages canvas visualizer, project slider carousel, skills filtering, code playground, and AI assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initSceneVideoPlayers();
  initProjectSlider();
  initSkillsFilter();
  initCodePlayground();
  initAICopilotChat();
  initContactForm();
  initNavScrollSpy();
});

/* ==========================================================================
   1. BACKGROUND PARTICLES & NEURAL GRID CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.min(Math.floor(width / 22), 65);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: i % 3 === 0 ? 'rgba(6, 182, 212, 0.4)' : i % 2 === 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(16, 185, 129, 0.35)'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw subtle grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 80;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Connect close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update & Draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. FEATURED PROJECTS SLIDER & CAROUSEL
   ========================================================================== */
function initProjectSlider() {
  const track = document.querySelector('.projects-slider-track');
  const slides = document.querySelectorAll('.project-slide');
  const prevBtn = document.getElementById('slider-prev');
  const NextBtn = document.getElementById('slider-next');
  const dotsContainer = document.querySelector('.slider-indicators');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create dot indicators
  dotsContainer.innerHTML = '';
  slides.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${idx + 1}`);
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (NextBtn) NextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) goToSlide(currentIndex + 1);
    if (touchEndX - touchStartX > 50) goToSlide(currentIndex - 1);
  }, { passive: true });
}

/* ==========================================================================
   3. SKILLS MATRIX TAB FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE CODE & ARCHITECTURE PLAYGROUND
   ========================================================================== */
function initCodePlayground() {
  const tabs = document.querySelectorAll('.terminal-tab-btn');
  const codeDisplay = document.getElementById('code-display');

  const CODE_SNIPPETS = {
    mern: `// Express REST API + MongoDB Mongoose Controller (Majdoor Mitra)
import express from 'express';
import { Job, WorkerProfile } from '../models/schema.js';
import { verifyAuthToken } from '../middleware/auth.js';

const router = express.Router();

// Match skilled laborers with real-time job listings
router.post('/jobs/match-trade', verifyAuthToken, async (req, res) => {
  try {
    const { tradeCategory, location, maxBudget } = req.body;
    
    // Aggregation query for verified active workers
    const matchedWorkers = await WorkerProfile.find({
      trade: tradeCategory,
      isAvailable: true,
      dailyRate: { $lte: maxBudget },
      'location.city': location
    }).sort({ rating: -1 }).limit(10);

    return res.status(200).json({
      success: true,
      count: matchedWorkers.length,
      data: matchedWorkers
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;`,

    python_ai: `# Python FastAPI + LLM Chatbot Integration Engine
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import openai
import os

app = FastAPI(title="Arshad AI Assistant Backend", version="1.0.0")

class ChatQuery(BaseModel):
    user_message: str
    context_session_id: str

@app.post("/api/v1/chat-copilot")
async def generate_copilot_response(payload: ChatQuery):
    try:
        # Structured system context grounding
        system_prompt = (
            "You are an AI assistant representing Arshad Khan, a full-stack MERN "
            "and Python developer. Answer questions accurately based on his projects "
            "(Majdoor Mitra, SpendWise) and technical competencies."
        )
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": payload.user_message}
            ],
            temperature=0.3
        )
        
        return {
            "status": "success",
            "reply": response.choices[0].message.content
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))`,

    supabase_sql: `-- Supabase PostgreSQL Row Level Security (RLS) & Triggers (SpendWise)
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    type TEXT CHECK (type IN ('income', 'expense')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS for complete tenant isolation
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only view their own transactions"
ON public.transactions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions"
ON public.transactions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Real-time analytics view for category aggregate totals
CREATE OR REPLACE VIEW user_monthly_expense_summary AS
SELECT 
    user_id,
    category,
    SUM(amount) as total_spent,
    COUNT(*) as transaction_count
FROM public.transactions
WHERE type = 'expense'
GROUP BY user_id, category;`
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const snippetKey = tab.getAttribute('data-tab');
      if (codeDisplay && CODE_SNIPPETS[snippetKey]) {
        codeDisplay.textContent = CODE_SNIPPETS[snippetKey];
      }
    });
  });
}

/* ==========================================================================
   5. LIVE AI COPILOT CONVERSATIONAL WIDGET
   ========================================================================== */
function initAICopilotChat() {
  const chatBody = document.getElementById('ai-chat-messages');
  const inputField = document.getElementById('ai-chat-input');
  const sendBtn = document.getElementById('ai-send-btn');
  const suggestionsBar = document.getElementById('ai-suggestions-container');

  if (!chatBody || !inputField || !sendBtn) return;

  // Render suggestion pills
  if (suggestionsBar && window.ArshadAICopilot) {
    const queries = window.ArshadAICopilot.getSuggestedQueries();
    suggestionsBar.innerHTML = '';
    queries.forEach(queryText => {
      const pill = document.createElement('button');
      pill.className = 'suggestion-pill';
      pill.textContent = queryText;
      pill.addEventListener('click', () => {
        inputField.value = queryText;
        handleSendMessage();
      });
      suggestionsBar.appendChild(pill);
    });
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleSendMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    appendMessage('user', text);
    inputField.value = '';

    // Typing animation simulation
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg bot';
    typingIndicator.innerHTML = '<em>Arshad AI is thinking...</em>';
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      if (window.ArshadAICopilot) {
        const reply = window.ArshadAICopilot.generateResponse(text);
        appendMessage('bot', reply);
      }
    }, 450);
  }

  sendBtn.addEventListener('click', handleSendMessage);
  inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendMessage();
  });
}

/* ==========================================================================
   6. CONTACT FORM & TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🎉 Thank you! Your message has been sent to Arshad.');
      form.reset();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('contact.arshad2048@gmail.com');
      showToast('📋 Email address copied to clipboard!');
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   7. NAVIGATION SCROLL SPY & MOBILE MENU
   ========================================================================== */
function initNavScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinksContainer.style.display === 'flex';
      navLinksContainer.style.display = isVisible ? 'none' : 'flex';
      navLinksContainer.style.flexDirection = 'column';
      navLinksContainer.style.position = 'absolute';
      navLinksContainer.style.top = '72px';
      navLinksContainer.style.left = '0';
      navLinksContainer.style.right = '0';
      navLinksContainer.style.background = '#0B0D14';
      navLinksContainer.style.padding = '24px';
      navLinksContainer.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
    });
  }
}

/* ==========================================================================
   8. SCENE VIDEO PLAYBACK & HOVER ENGINE
   ========================================================================== */
function initSceneVideoPlayers() {
  const sceneVisuals = document.querySelectorAll('.scene-visual');

  sceneVisuals.forEach(visual => {
    const video = visual.querySelector('video');
    const badge = visual.querySelector('.video-play-badge');
    if (!video) return;

    let isPlaying = false;

    // Hover play
    visual.addEventListener('mouseenter', () => {
      video.play().then(() => {
        isPlaying = true;
        if (badge) badge.innerHTML = '<span>⏸ Playing Flight</span>';
      }).catch(() => {});
    });

    visual.addEventListener('mouseleave', () => {
      video.pause();
      isPlaying = false;
      if (badge) badge.innerHTML = '<span>▶ 10s Flight</span>';
    });

    // Click toggle
    visual.addEventListener('click', () => {
      if (video.paused) {
        video.play().then(() => {
          if (badge) badge.innerHTML = '<span>⏸ Playing Flight</span>';
        }).catch(() => {});
      } else {
        video.pause();
        if (badge) badge.innerHTML = '<span>▶ 10s Flight</span>';
      }
    });
  });

  // Intersection Observer for scroll-based auto preview on mobile/desktop
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        const badge = entry.target.querySelector('.video-play-badge');
        if (!video) return;

        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          video.play().then(() => {
            if (badge) badge.innerHTML = '<span>⏸ Playing Flight</span>';
          }).catch(() => {});
        } else {
          video.pause();
          if (badge) badge.innerHTML = '<span>▶ 10s Flight</span>';
        }
      });
    }, { threshold: [0.6] });

    sceneVisuals.forEach(v => {
      if (v.querySelector('video')) observer.observe(v);
    });
  }
}

