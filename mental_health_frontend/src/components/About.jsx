import { useAuth } from "../authContext";
import { Navigate } from "react-router-dom";
import ikigai from "../assets/ikigai.png";
import "../App.css";

export default function About() {
    const { currentUser } = useAuth();
    return (
        currentUser.isLoggedIn ? 
        <div className="about-ikigai">
            <header>
                <h2>A Reason to Live</h2>
            </header>
            <main>
                <div className="image">
                    <img src={ikigai} alt="ikigai-diagram" />
                </div>
                <div className="section">
                    <h3 className="section-header">What is it?</h3>
                    <div className="section-body">
                        <p>Ikigai (pronounced "ee-kee-guy") is a Japanese concept that translates to <strong>"reason for being."</strong> It represents the intersection of the things that make life fulfilling and meaningful: a unique blend of purpose, passion, and practicality.</p> 
                        <p>Rooted in Japanese culture, ikigai is about discovering the balance between what you love, what you’re good at, what the world needs, and what you can be paid for.
                        At its core, ikigai is a deeply personal journey that encourages individuals to reflect on their passions, strengths, and contributions to the world. It's not just about achieving happiness or success but about finding a sense of fulfillment that motivates you to wake up each morning with purpose.</p>
                        <p>The word itself comes from "iki" (life) and "gai" (value or worth), making it a way to explore the things that bring value to your life and give you a reason to live. While the idea of ikigai is deeply ingrained in Japanese culture, its principles resonate universally and can serve as a powerful framework for anyone seeking clarity in their life or career.</p>
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-header">The 4 Pillars of Ikigai</h3>
                    <div className="section-body">
                        <p>Ikigai is often represented as a Venn diagram with four overlapping circles, each representing an essential pillar of fulfillment. The intersection of these four components is where you can find your ikigai. Let’s explore each pillar:</p>
                        <ol>
                            <li>
                                <div className="pillar">
                                    <p><strong>What You Love (Passion)</strong></p>
                                    <p>This is the heart of ikigai—the things that bring you joy and excitement. It includes your hobbies, interests, and the activities you genuinely enjoy. When you’re doing what you love, time seems to fly, and you feel energized and fulfilled.</p>
                                    <p><i>Example:</i> Painting, coding, teaching, writing, playing music, or gardening—anything that makes you feel alive.</p>
                                </div>
                            </li>
                            <li>
                                <div className="pillar">
                                    <p><strong>What You are Good At (Profession)</strong></p>
                                    <p>This focuses on your strengths, skills, and talents—things you excel at or can develop further through practice. It’s about recognizing what you bring to the table and leveraging those skills to contribute meaningfully.</p>
                                    <p><i>Example:</i> A natural ability to solve problems, teach, design, communicate, or build systems.</p>
                                </div>
                            </li>
                            <li>
                                <div className="pillar">
                                    <p><strong>What the World Needs (Mission)</strong></p>
                                    <p>This pillar is about impact—how you can make a difference in the world. It connects your personal passions and skills with larger societal needs or the needs of a community. It’s about identifying where you can contribute meaningfully to make the world a better place.</p>
                                    <p><i>Example:</i> Addressing environmental issues, improving education, creating better technology, or supporting mental health initiatives.</p>
                                </div>
                            </li>
                            <li>
                                <div className="pillar">
                                    <p><strong>What You Can be Paid For (Vocation)</strong></p>
                                    <p>The practical side of ikigai—turning your passions and skills into a sustainable career or income stream. It’s about aligning your work with your values and creating opportunities where your contributions are valued and compensated.</p>
                                    <p><i>Example:</i> Earning a living as a writer, developer, entrepreneur, educator, or designer.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-header">Why Ikigai Matters</h3>
                    <div className="section-body">
                        <p>Living a life of ikigai doesn’t necessarily mean you’ve found the "perfect job" or "ideal life." Instead, it’s about creating harmony between what brings you personal satisfaction and what allows you to contribute to the world. By aligning your ikigai with your day-to-day life, you can experience greater purpose, joy, and resilience. Here’s why ikigai is powerful:</p>
                        <ol>
                            <li>
                                <p><strong>Clarity in Life Decisions</strong></p>
                                <p>Understanding your ikigai can help you make decisions about your career, relationships, and goals with greater confidence. It provides a framework to focus on what truly matters to you.</p>
                            </li>
                            <li>
                                <p><strong>A Sense of Fulfillment</strong></p>
                                <p>Ikigai encourages you to pursue meaningful work and hobbies, leading to a more balanced and satisfying life.</p>
                            </li>
                            <li>
                                <p><strong>Sustainable Motivation</strong></p>
                                <p>Unlike fleeting goals or material achievements, ikigai provides an enduring source of motivation. It’s a reason to wake up every morning with energy and purpose.</p>
                            </li>
                            <li>
                                <p><strong>Impact Beyond Yourself</strong></p>
                                <p>By connecting your skills and passions with what the world needs, ikigai enables you to make a positive impact on others while living authentically.</p>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-header">How to Find Your Ikigai</h3>
                    <div className="section-body">
                        <p>Finding your ikigai is a journey, not a destination. It requires introspection, exploration, and sometimes experimentation. Here are steps to help you discover it:</p>
                        <ol>
                            <li>
                                <p><strong>Reflect on Each Pillar - </strong><span>Spend time answering questions about what you love, what you’re good at, what the world needs, and what you can be paid for.</span></p>
                            </li>
                            <li>
                                <p><strong>Look for Overlaps - </strong><span>Identify where these areas intersect. For example, if you love teaching, are good at explaining concepts, and the world needs better education, your ikigai might involve creating educational content.</span></p>
                            </li>
                            <li>
                                <p><strong>Experiment and Adapt - </strong><span>Test your ideas in real life. Volunteer, take on side projects, or start small initiatives to explore how your ikigai works in practice.</span></p>
                            </li>
                            <li>
                                <p><strong>Embrace Growth - </strong><span>Your ikigai may evolve over time as your passions, skills, and priorities change. Stay open to adjusting your path.</span></p>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="section">
                    <h3 className="section-header">Living with Ikigai</h3>
                    <div className="section-body">
                        <p>In Japanese culture, ikigai is often linked to longevity and happiness. It’s not just about achieving big goals but finding joy in small, everyday moments. Whether it’s enjoying a morning walk, helping a friend, or solving a challenging problem at work, ikigai reminds us to focus on what makes life meaningful.</p>
                        <p>By finding your ikigai and aligning your life with it, you can experience greater clarity, balance, and purpose. Start your journey today—what’s your reason for being?</p>
                    </div>
                </div>
            </main>
        </div> : <Navigate to="/login" />
    )
}