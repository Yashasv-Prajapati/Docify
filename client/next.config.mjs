/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Add custom webpack configuration here
        config.module.rules.push({
          test: /\.node$/,
          loader: 'node-loader', // Replace 'node-loader' with the appropriate loader for your binary files
        });
    
        return config;
      },
};

export default nextConfig;
