// ProfileCard.jsx
import React from 'react';

const ProfileCard = () => {
  const developer = {
    name: 'Jane Doe',
    role: 'Full-Stack Developer',
    avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
    location: 'Pokhara, Nepal',
    skills: ['React', 'JavaScript', 'Tailwind', 'Node.js', 'Prisma'],
    website: 'https://janedoe.dev',
    github: 'https://github.com/janedoe',
    twitter: 'https://twitter.com/janedoe',
  };

  return (
    
    <div className='flex  justify-center  bg-slate-900'>
      <div className="max-w-sm w-full rounded-2xl bg-slate-900 text-slate-100 shadow-lg border border-slate-800 p-6 ">
      {/* Top section */}
      <div className="flex items-center gap-4">
        <img
          src={developer.avatarUrl}
          alt={developer.name}
          className="h-16 w-16 rounded-full object-cover border border-slate-700"
        />
        <div>
          <h2 className="text-lg font-semibold">{developer.name}</h2>
          <p className="text-sm text-slate-400">{developer.role}</p>
          <p className="text-xs text-slate-500 mt-1">{developer.location}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Tech stack
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {developer.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-200 border border-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={developer.website}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-sky-400 hover:text-sky-300"
        >
          Portfolio
        </a>
        <a
          href={developer.github}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-slate-300 hover:text-white"
        >
          GitHub
        </a>
        <a
          href={developer.twitter}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-sky-400 hover:text-sky-300"
        >
          Twitter
        </a>
      </div>
    </div>
    </div>
   
  );

};

export default ProfileCard;