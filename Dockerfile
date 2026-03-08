FROM ruby:4.0.1

# System deps: build tools, libpq (for pg gem), Node 16
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
      curl \
      gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# ── Gems (cached until Gemfile.lock changes) ────────────────────────────────
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

# ── JS source + assets (webpack output is app/assets/javascripts/bundle.js) ─
COPY package.json package-lock.json ./
COPY frontend/ frontend/
COPY app/assets/ app/assets/
COPY webpack.config.js ./
RUN npm install --legacy-peer-deps
# postinstall hook runs `webpack` and writes bundle.js into app/assets/javascripts/

# ── Rails application ────────────────────────────────────────────────────────
COPY . .

ENTRYPOINT ["bin/docker-entrypoint.sh"]
CMD ["bundle", "exec", "rspec"]
